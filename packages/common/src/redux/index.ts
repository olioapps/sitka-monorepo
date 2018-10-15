import * as redux from "redux"
import { combineHandlers } from "redux-instant"
import { applyMiddleware, createStore, Middleware } from "redux"
import { createLogger } from "redux-logger"
import createSagaMiddleware, { SagaMiddleware } from "redux-saga"
import rootSaga from "../redux/sagas"

import {
    counterHandlers,
    otherHandlers,
} from "../redux/modules/counter"

export interface AppState {
    readonly counter: number
}

const appState: AppState = {
    counter: 0,
}

const INITIAL_STATE: AppState = appState

const handlers = {
    ...counterHandlers,
    ...otherHandlers,
}

const { actions, actionTypes, reducer } = combineHandlers(
    "Counter0", // unique prefix to distinguish actions defined in this module
    (): AppState => appState, // function to get initial state - make sure to include the type annotation!
    handlers,
)

const appReducer: redux.Reducer = redux.combineReducers({ reducer })

// middleware
const sagaMiddleware: SagaMiddleware<{}> = createSagaMiddleware()
const logger: Middleware = createLogger({
    stateTransformer: (state: AppState) => state,
})
const commonMiddleware: ReadonlyArray<Middleware> = [sagaMiddleware, logger]

const createStoreWithMiddleware = createStore(
    reducer as redux.Reducer<{}, redux.AnyAction>,
    {}, //appState as redux.DeepPartial<{}>,
    applyMiddleware(...commonMiddleware),
)

const store = createStoreWithMiddleware

const storeCreatorWrapper = (clientMiddleWare?: ReadonlyArray<Middleware>) => {
    const combinedMiddleware = clientMiddleWare
        ? [...commonMiddleware, ...clientMiddleWare]
        : commonMiddleware

    return () =>
        createStore(
            appReducer as redux.Reducer<{}, redux.AnyAction>, // appReducer,
            {}, // INITIAL_STATE as redux.DeepPartial<{}>,
            applyMiddleware(...combinedMiddleware),
        )
}

const runMiddleware = () => sagaMiddleware.run(rootSaga)

export {
    actions,
    actionTypes,
    appState,
    store,
    reducer,
    storeCreatorWrapper,
    runMiddleware,
    INITIAL_STATE,
}
