import { 
    applyMiddleware,
    combineReducers,
    createStore,
    DeepPartial,
    Middleware,
    ReducersMapObject, 
    Store,
} from "redux"

import createSagaMiddleware, { SagaMiddleware } from "redux-saga"

import { createLogger } from "redux-logger"

export const createAppStore = (
    intialState: {},
    middleware: Middleware[],
    reducersToCombine: ReducersMapObject[],
    sagaRoot: (() => IterableIterator<{}>),
): Store => {

    const logger: Middleware = createLogger({
        stateTransformer: (state: {}) => state,
    })
    const sagaMiddleware: SagaMiddleware<{}> = createSagaMiddleware()
    const commonMiddleware: ReadonlyArray<Middleware> = [sagaMiddleware, logger]

    const appReducer = reducersToCombine.reduce( 
        (acc, r) => ({...acc, ...r}), {}
    )

    const combinedMiddleware = middleware
        ? [...commonMiddleware, ...middleware]
        : commonMiddleware

    const store: Store = createStore(
        combineReducers(appReducer),
        intialState as DeepPartial<{}>,
        applyMiddleware(...combinedMiddleware),
    )

    sagaMiddleware.run(sagaRoot)

    return store
}