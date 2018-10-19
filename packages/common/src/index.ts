// this is the source file while compiles @cashew/common, imported into web/

import {
    actions as importedActions,
    appState,
    AppState,
    INITIAL_STATE,
    runMiddleware,
    store,
    storeCreatorWrapper,
} from "./redux/index"

import {
    ConnectedClass,
    ConnectedClassAction,
    Sitka,
    SitkaMeta,
} from "./sitka/sitka"

import {
    DecrementAction,
    IncrementAction,
    ResetAction,
} from "./redux/modules/counter"

const actions = { ...importedActions }
const defaultAppState = INITIAL_STATE

export {
    actions,
    DecrementAction,
    IncrementAction,
    ResetAction,
    defaultAppState,
    runMiddleware,
    store,
    storeCreatorWrapper,
    AppState,
    appState,
    // sitka
    ConnectedClass,
    ConnectedClassAction,
    Sitka,
    SitkaMeta,
}