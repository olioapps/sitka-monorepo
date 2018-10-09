import * as redux from "redux"

interface IncrementAction {
    readonly type: string
}

interface IDecrementAction {
    readonly type: string
}

interface IResetAction {
    readonly type: string
}

interface IAppState {
    readonly digit: number
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
    digit: 1,
}

export const INITIAL_STATE: IAppState = appState

function counter(
    state = INITIAL_STATE.digit,
    action: IncrementAction | IDecrementAction,
) {
    switch (action.type) {
        case "INCREMENT":
            /* tslint:disable */
            console.log("+1")
            /* tslint:enable */

            return state + 1
        case "DECREMENT":
            /* tslint:disable */

            console.log("-1")
            /* tslint:enable */
            return state - 1
        case "RESET":
            return INITIAL_STATE.digit
        default:
            return state
    }
}

export const appReducer = redux.combineReducers({ counter })

import { createStore } from "redux"

// const clientMiddleware: Middleware = <Middleware> createClientMiddleware()
// const logger = createLogger({ stateTransformer: (state: Core.IAppState) => state })
// const sagaMiddleware = createSagaMiddleware()
// const additionalMiddleware: ReadonlyArray<Middleware> = [logger, clientMiddleware]
// const middleware: ReadonlyArray<Middleware> = [ sagaMiddleware ].concat(additionalMiddleware)

// const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
export const store = createStore(appReducer)
// sagaMiddleware.run(Sagas.root)
/* tslint:disable */
// console.log(store.getState()) // THIS WORKS
/* tslint:enable */
const actions = { increment, decrement, reset }

export { IAppState, actions, appState }
