import * as redux from "redux"
import { applyMiddleware, createStore, Middleware } from "redux"
import { createLogger } from "redux-logger"
import { actions, counter } from "../redux/modules/counter"

// begin imports without special characters
import createSagaMiddleware from "redux-saga"
import rootSaga from "../redux/sagas"

export interface AppState {
    readonly counter: number
}

const appState: AppState = {
    counter: 0,
}

const INITIAL_STATE: AppState = appState

const appReducer: redux.Reducer = redux.combineReducers({ counter })
const logger = createLogger({ stateTransformer: (state: AppState) => state })
const sagaMiddleware = createSagaMiddleware()
const middleware: ReadonlyArray<Middleware> = [sagaMiddleware, logger]

const createStoreWithMiddleware = createStore(
    appReducer,
    INITIAL_STATE as redux.DeepPartial<{}>,
    applyMiddleware(...middleware),
)

const store = createStoreWithMiddleware
sagaMiddleware.run(rootSaga)

export { actions, appState, store, INITIAL_STATE }
