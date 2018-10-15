// this is the source file while compiles @cashew/common, imported into web/

import {
    actions,
    actionTypes,
    appState,
    AppState,
    INITIAL_STATE,
    runMiddleware,
    store,
    storeCreatorWrapper,
    reducer,
} from "./redux/index"

import {
    DecrementAction,
    IncrementAction,
    ResetAction,
} from "./redux/modules/counter"

const defaultAppState = INITIAL_STATE

export {
    actions,
    DecrementAction,
    IncrementAction,
    ResetAction,
    actionTypes,
    defaultAppState,
    runMiddleware,
    store,
    storeCreatorWrapper,
    AppState,
    appState,
    reducer,
}