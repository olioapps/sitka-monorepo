import * as redux from "redux"

export const add = (a: number, b: number) => a + b

export const frank = "fraaank"

export interface IsTrueAction {
    readonly type: "IS_TRUE"
    readonly isTrue: boolean
}

export const isTrue1 = (isTrue: boolean): IsTrueAction => ({
    isTrue,
    type: "IS_TRUE",
})

// export interface AppState {
//     readonly works: string
//     readonly isTrue: boolean
// }

export const appState = {
    isTrue: false,
    works: "somehow",
}

export const INITIAL_STATE = appState

export function reducer1(
    state: boolean = INITIAL_STATE.isTrue,
    action: IsTrueAction,
): boolean {
    switch (action.type) {
        case "IS_TRUE":
            return action.isTrue
        default:
            return state
    }
}

export const appReducer = redux.combineReducers({ reducer1 })

import { createStore } from "redux"

// const clientMiddleware: Middleware = <Middleware> createClientMiddleware()
// const logger = createLogger({ stateTransformer: (state: Core.AppState) => state })
// const sagaMiddleware = createSagaMiddleware()
// const additionalMiddleware: ReadonlyArray<Middleware> = [logger, clientMiddleware]
// const middleware: ReadonlyArray<Middleware> = [ sagaMiddleware ].concat(additionalMiddleware)

// const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
const store = createStore(appReducer)
// sagaMiddleware.run(Sagas.root)

export { store }
