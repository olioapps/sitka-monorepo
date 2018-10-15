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

const defaultAppState = INITIAL_STATE

export {
    actions,
    actionTypes,
    defaultAppState,
    runMiddleware,
    store,
    storeCreatorWrapper,
    AppState,
    appState,
    reducer,
}