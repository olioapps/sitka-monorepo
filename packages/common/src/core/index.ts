import { 
    ColorModule, 
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

import {
    counter,
    defaultState as counterDefaultState,
} from "../core/modules/counter/redux"

export interface AppModules {
    readonly color: ColorModule
    readonly pets: PetModule
}

export interface AppState {
    readonly color: string
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
const colorModule = new ColorModule()
const petModule = new PetModule()
sitka.register(colorModule)
sitka.register(petModule)

const sitkaMeta = sitka.createSitkaMeta()
const sitkaState = {
    color: "",
    pets:  { ...petModule.defaultState() },
}
const sitkaReducers = {
    ...sitkaMeta.reducersToCombine,
    sitka: (
        state: { sitka: Sitka<AppModules> } = {sitka: new Sitka<AppModules>()},
    ): { sitka: Sitka<AppModules> } => state,
}

////////////////////////////////////////////////////////////////////
// setup bespoke

const bespokeState = {
    ...counterDefaultState,
}
const bespokeReducers = [
    {
        counter,
    },
]

const defaultAppState: AppState = {
    ...sitkaState,
    ...bespokeState,
    sitka,
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
            { ...sitkaReducers },
        ],
        root,
    )

    sitka.setDispatch(store.dispatch)

    return store
}