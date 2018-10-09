import * as redux from "redux"
import { applyMiddleware, createStore, Middleware } from "redux"
import { createLogger } from "redux-logger"
import { actions, counter } from "./redux/modules/counter"

import createSagaMiddleware from "redux-saga"

export interface IAppState {
    readonly counter: number
}

const appState: IAppState = {
    counter: 0,
}

const INITIAL_STATE: IAppState = appState

const appReducer = redux.combineReducers({ counter })
const logger = createLogger({ stateTransformer: (state: IAppState) => state })
const sagaMiddleware = createSagaMiddleware()
const middleware: ReadonlyArray<Middleware> = [sagaMiddleware, logger]

const createStoreWithMiddleware = createStore(
    appReducer,
    INITIAL_STATE,
    applyMiddleware(...middleware),
)

const store = createStoreWithMiddleware
// sagaMiddleware.run(Sagas.root)

export { actions, appState, store, INITIAL_STATE }
