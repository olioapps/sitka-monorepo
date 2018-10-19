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
    modules,
    otherDefaultState,
    OtherState,
    sitka,
    Sitka,
    SitkaMeta,
    SitkaModules,
    TestState,
} from "./sitka/index"

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

    Sitka,
    SitkaMeta,
    modules,
    sitka,
    SitkaModules,
    otherDefaultState,
    OtherState,
    TestState,
}