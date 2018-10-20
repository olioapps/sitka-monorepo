import {
    Action,
    combineReducers,
    createStore,
    ReducersMapObject,
    Store,
    Dispatch,
} from "redux"
import { applyMiddleware } from "redux"
import { createLogger } from "redux-logger"
import createSagaMiddleware from "redux-saga"
import { all, apply, takeEvery } from "redux-saga/effects"

export interface BaseMap<T = {}> {
    [key: string]: T
}

export type ConnectedClassAction<T> = Partial<T> & { type: string }

export abstract class ConnectedClass<T extends BaseMap, X extends Sitka> {
    public sitka: X | undefined

    public abstract moduleName(): string

    // by default, the redux key is same as the moduleName
    public reduxKey(): string {
        return this.moduleName()
    }

    public abstract defaultState(): T

    public createAction(v: Partial<T>): ConnectedClassAction<T> {
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
export class Sitka<T = {}, A = {}> {
    // tslint:disable-next-line:no-any
    private sagaMiddleware: any
    private sagas: SagaMeta[] = []
    private reducersToCombine: ReducersMapObject = {}
    protected registeredModules: T
    private dispatch?: Dispatch

    constructor() {
        this.doDispatch = this.doDispatch.bind(this)
        this.root = this.root.bind(this)
        this.createStore = this.createStore.bind(this)
        this.registeredModules = {} as T
    }

    public setDispatch(dispatch: Dispatch): void {
        this.dispatch = dispatch
    }

    public getModules(): T {
        return this.registeredModules
    }

    public createSitkaMeta(): SitkaMeta {
        return {
            reducersToCombine: this.reducersToCombine,
            sagaRoot: this.root,
        }
    }

    public createStore(): Store<{}> {
        const logger = createLogger({
            stateTransformer: (state: A) => state,
        })

        this.sagaMiddleware = createSagaMiddleware()
        const middleware = [this.sagaMiddleware, logger]
        const store: Store = createStore(
            combineReducers(this.reducersToCombine),
            applyMiddleware(...middleware),
        )

        this.dispatch = store.dispatch

        this.sagaMiddleware.run(this.root)

        return store
    }

    public register<F extends BaseMap, T extends ConnectedClass<F, this>>(
        instance: T,
    ): T {
        const methodNames = Sitka.getInstanceMethodNames(
            instance,
            Object.prototype,
        )
        const setters = methodNames.filter(m => m.indexOf("set") === 0)
        const handlers = methodNames.filter(m => m.indexOf("handle") === 0)
        const moduleName = instance.moduleName()
        const { sagas, reducersToCombine, doDispatch: dispatch } = this

        instance.sitka = this

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
                const prevReducer: (state: F, action: Action) => F =
                    reducersToCombine[_reduxKey]

                const reducer = (
                    state: F = defaultState,
                    action: Action,
                ): F => {
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

                    const newState: F = Object.keys(action)
                        .filter(k => k !== "type")
                        .reduce(
                            (acc, k) =>
                                Object.assign(acc, {
                                    [k]: action[k],
                                }),
                            Object.assign({}, state),
                        ) as F

                    return newState
                }

                return reducer
            }

            reducersToCombine[reduxKey] = makeReducer(reduxKey)
        })

        this.registeredModules[moduleName] = instance

        return instance
    }

    private *root(): IterableIterator<{}> {
        const toYield: any[] = []
        const { registeredModules } = this

        /* tslint:disable */
        for (let i = 0; i < this.sagas.length; i++) {
            const s = this.sagas[i]
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

    private static hasMethod = (obj: {}, name: string) => {
        const desc = Object.getOwnPropertyDescriptor(obj, name)
        return !!desc && typeof desc.value === "function"
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
