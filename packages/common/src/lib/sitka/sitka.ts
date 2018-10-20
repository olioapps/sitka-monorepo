import {
    Action,
    combineReducers,
    createStore,
    Dispatch,
    ReducersMapObject,
    Store,
} from "redux"

import { applyMiddleware } from "redux"

import { createLogger } from "redux-logger"

import createSagaMiddleware from "redux-saga"

import { all, apply, takeEvery } from "redux-saga/effects"

// type BaseMap<T = any> = { [key: string]: T }

export type SitkaModuleAction<T> = Partial<T> & { type: string }

export abstract class SitkaModule<MODULE_STATE, MODULES> {
    public modules?: MODULES

    public abstract moduleName(): string

    // by default, the redux key is same as the moduleName
    public reduxKey(): string {
        return this.moduleName()
    }

    public abstract defaultState(): MODULE_STATE

    public createAction(v: Partial<MODULE_STATE>): SitkaModuleAction<MODULE_STATE> {
        return Object.assign({ type: this.reduxKey() }, v)
    }
}

interface SagaMeta {
    // tslint:disable-next-line:no-any
    readonly handler: any
    readonly name: string
}

interface SitkaAction extends Action {
    _instance: string
    // tslint:disable-next-line:no-any
    _args: any
}

// tslint:disable-next-line:max-classes-per-file
export class SitkaMeta {
    public readonly sagaRoot: (() => IterableIterator<{}>)
    public readonly reducersToCombine: ReducersMapObject
}

// tslint:disable-next-line:max-classes-per-file
export class Sitka<MODULES = {}> {
    // tslint:disable-next-line:no-any
    private sagaMiddleware: any
    private sagas: SagaMeta[] = []
    private reducersToCombine: ReducersMapObject = {}
    protected registeredModules: MODULES
    private dispatch?: Dispatch

    constructor() {
        this.doDispatch = this.doDispatch.bind(this)
        this.createStore = this.createStore.bind(this)
        this.createRoot = this.createRoot.bind(this)
        this.registeredModules = {} as MODULES
    }

    public setDispatch(dispatch: Dispatch): void {
        this.dispatch = dispatch
    }

    public getModules(): MODULES {
        return this.registeredModules
    }

    public createSitkaMeta(): SitkaMeta {
        return {
            reducersToCombine: this.reducersToCombine,
            sagaRoot: this.createRoot(),
        }
    }

    public createStore(): Store<{}> {
        const logger = createLogger({
            stateTransformer: (state: {}) => state,
        })

        this.sagaMiddleware = createSagaMiddleware()
        const middleware = [this.sagaMiddleware, logger]

        /*tslint:disable*/
        const store: Store = createStore(
            combineReducers({
                ...this.reducersToCombine,
                sitka: (
                    state: { sitka: Sitka<MODULES> } = {sitka: new Sitka<MODULES>()},
                    action: Action & {
                        sitka,
                    },
                ): { sitka: Sitka<MODULES> } => {
                    if (action.type !== "SITKA") {
                        return state
                    }
    
                    return {...state, sitka: action.sitka}
                }
            }),
            applyMiddleware(...middleware),
        )
        /*tslint:disable*/

        this.dispatch = store.dispatch
        this.sagaMiddleware.run(this.createRoot())

        return store
    }

    public register<MODULE_STATE, SITKA_MODULE extends SitkaModule<MODULE_STATE, MODULES>>(
        instance: SITKA_MODULE,
    ): SITKA_MODULE {
        const methodNames = Sitka.getInstanceMethodNames(
            instance,
            Object.prototype,
        )
        const setters = methodNames.filter(m => m.indexOf("set") === 0)
        const handlers = methodNames.filter(m => m.indexOf("handle") === 0)
        const moduleName = instance.moduleName()
        const { sagas, reducersToCombine, doDispatch: dispatch } = this

        instance.modules = this.getModules()

        handlers.forEach(s => {
            // tslint:disable:ban-types
            const original: Function = instance[s] // tslint:disable:no-any

            function patched(): void {
                const args = arguments
                const action: SitkaAction = {
                    _args: args,
                    _instance: moduleName,
                    type: s,
                }

                dispatch(action)
            }

            sagas.push({
                handler: original,
                name: s,
            })
            // tslint:disable-next-line:no-any
            instance[s] = patched
        })

        // create reducers for setters
        setters.forEach(_ => {
            const reduxKey: string = instance.reduxKey()
            const defaultState = instance.defaultState()

            const makeReducer = (_reduxKey: string) => {
                const prevReducer: (state: MODULE_STATE, action: Action) => MODULE_STATE =
                    reducersToCombine[_reduxKey]

                const reducer = (
                    state: MODULE_STATE = defaultState,
                    action: Action,
                ): MODULE_STATE => {
                    if (action.type !== _reduxKey) {
                        return state
                    }

                    // there was a previous reducer
                    // evaluate it
                    const previousReducerExisted: boolean = !!prevReducer
                    if (previousReducerExisted) {
                        const result = prevReducer(state, action)
                        if (result === defaultState) {
                            return state
                        }
                    }

                    const newState: MODULE_STATE = Object.keys(action)
                        .filter(k => k !== "type")
                        .reduce(
                            (acc, k) =>
                                Object.assign(acc, {
                                    [k]: action[k],
                                }),
                            Object.assign({}, state),
                        ) as MODULE_STATE

                    return newState
                }

                return reducer
            }

            reducersToCombine[reduxKey] = makeReducer(reduxKey)
        })

        this.registeredModules[moduleName] = instance

        return instance
    }

    private static hasMethod = (obj: {}, name: string) => {
        const desc = Object.getOwnPropertyDescriptor(obj, name)
        return !!desc && typeof desc.value === "function"
    }

    private createRoot(): (() => IterableIterator<{}>) {
        const { sagas, registeredModules } = this

        function* root(): IterableIterator<{}> {

            /* tslint:disable */
            const toYield: any[] = []
    
            for (let i = 0; i < sagas.length; i++) {
                const s = sagas[i]
                const generator = function*(action: any): {} {
                    const instance: {} = registeredModules[action._instance]
                    yield apply(instance, s.handler, action._args)
                }
                const item: any = yield takeEvery(s.name, generator)
                toYield.push(item)
            }
            /* tslint:enable */
    
            yield all(toYield)
        }

        return root
    }

    private static getInstanceMethodNames = (obj: {}, stop: {}) => {
        const array: string[] = []
        let proto = Object.getPrototypeOf(obj)
        while (proto && proto !== stop) {
            Object.getOwnPropertyNames(proto).forEach(name => {
                if (name !== "constructor") {
                    if (Sitka.hasMethod(proto, name)) {
                        array.push(name)
                    }
                }
            })
            proto = Object.getPrototypeOf(proto)
        }
        return array
    }

    private doDispatch(action: Action): void {
        const { dispatch } = this
        if (!!dispatch) {
            dispatch(action)
        }
    }
}
