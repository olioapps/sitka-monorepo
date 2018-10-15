import * as redux from "redux"
import { combineHandlers } from "redux-instant"
import { applyMiddleware, createStore, Middleware } from "redux"
import { createLogger } from "redux-logger"
import {
    // counter,
    counterHandlers,
    otherHandlers,
} from "../redux/modules/counter"
// import { counterHandlers, otherHandlers } from "../redux/modules/counter"

// begin imports without special characters
import createSagaMiddleware, { SagaMiddleware } from "redux-saga"
import rootSaga from "../redux/sagas"

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

// maybe change the thing here?
const appReducer: redux.Reducer = redux.combineReducers({ reducer })
const logger: Middleware = createLogger({
    stateTransformer: (state: AppState) => state,
})
const sagaMiddleware: SagaMiddleware<{}> = createSagaMiddleware()
const commonMiddleware: ReadonlyArray<Middleware> = [sagaMiddleware, logger]

const createStoreWithMiddleware = createStore(
    reducer as redux.Reducer<{}, redux.AnyAction>,
    {}, //appState as redux.DeepPartial<{}>,
    applyMiddleware(...commonMiddleware),
)

const store = createStoreWithMiddleware

// fn that returns a wrapped store creator
// storeCreatorWrapper :: clientMiddleware -> () -> sreateStoreWithMiddleWAre
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

// fn that accepts middleware and returns a created store
// storeCreator :: fn, Middleware -> redux.Store<any, redux.AnyAction> & { dispatch: {} }

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
