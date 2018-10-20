import { 
    ColorModule, 
    ColorState,
} from "./modules/color/color"

import { 
    PetModule, 
    PetState,
} from "./modules/pets/pets"

import { 
    Sitka, 
} from "../lib/sitka/sitka"

import { 
    Middleware,
    ReducersMapObject, 
    Store,
} from "redux"

import {
    call,
} from "redux-saga/effects"

import {
    createAppStore,
} from "../lib/redux/store_creator"

import * as Counter from "../core/modules/counter/redux"

export interface AppModules {
    readonly color: ColorModule
    readonly pets: PetModule
}

export interface AppState {
    readonly color: ColorState
    readonly pets: PetState
    readonly counter: number
    readonly sitka: Sitka<AppModules>
}

//
// create the store as an amalgam of sitka modules and bespoke
//

////////////////////////////////////////////////////////////////////
// setup sitka modules
const sitka = new Sitka<AppModules>()
sitka.register(
    [
        new ColorModule(),
        new PetModule(),
    ]
)

const sitkaMeta = sitka.createSitkaMeta()

////////////////////////////////////////////////////////////////////
// setup bespoke

const bespokeState = {
    ...Counter.defaultState,
}

const bespokeReducers = [
    {
        counter: Counter.reducer,
    },
]

const defaultAppState: Partial<AppState> = {
    ...sitkaMeta.defaultState,
    ...bespokeState,
}

////////////////////////////////////////////////////////////////////

export const createCoreAppStore = (
    middleware?: Middleware[],
    reducersToCombine?: ReducersMapObject[],
    sagaRoot?: () => {},
): Store => {

    function* root(): IterableIterator<{}> {
        if (sagaRoot) {
            yield call(sagaRoot)
        }
        yield call(sitkaMeta.sagaRoot)
    }

    const store = createAppStore(
        defaultAppState,
        [ ...middleware || [] ],
        [ 
            ...reducersToCombine || [], 
            ...bespokeReducers,
            { ...sitkaMeta.reducersToCombine },
        ],
        root,
    )

    sitka.setDispatch(store.dispatch)

    return store
    // const sitka2 = new Sitka<AppModules>()
    // sitka2.register(
    //     [
    //         new ColorModule(),
    //         new PetModule(),
    //     ]
    // )

    // return sitka2.createStore()
}