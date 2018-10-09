import * as redux from "redux"

export interface IncrementAction {
    readonly type: string
}

export interface IDecrementAction {
    readonly type: string
}

export interface IResetAction {
    readonly type: string
}

export interface IAppState {
    readonly counter: number
}

const increment = (): IncrementAction => ({
    type: "INCREMENT",
})

const decrement = (): IDecrementAction => ({
    type: "DECREMENT",
})

const reset = (): IResetAction => ({
    type: "RESET",
})

const appState: IAppState = {
    counter: 0,
}

export const INITIAL_STATE: IAppState = appState

function counter(
    state = INITIAL_STATE.counter,
    action: IncrementAction | IDecrementAction,
) {
    switch (action.type) {
        case "INCREMENT":
            /* tslint:disable */
            console.log("reducer", state + 1)
            /* tslint:enable */
            return state + 1
        case "DECREMENT":
            return state - 1
        case "RESET":
            return INITIAL_STATE.counter
        default:
            return state
    }
}

export const appReducer = redux.combineReducers({ counter })

// const clientMiddleware: Middleware = <Middleware> createClientMiddleware()
// const logger = createLogger({ stateTransformer: (state: Core.IAppState) => state })
// const sagaMiddleware = createSagaMiddleware()
// const additionalMiddleware: ReadonlyArray<Middleware> = [logger, clientMiddleware]
// const middleware: ReadonlyArray<Middleware> = [ sagaMiddleware ].concat(additionalMiddleware)

// const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
const store = redux.createStore(appReducer)
// sagaMiddleware.run(Sagas.root)

const actions = { increment, decrement, reset }

export { actions, appState, store }
