import { AppModules, AppState } from "../../index"

import { put, select } from "redux-saga/effects"

import { SitkaModule } from "../../../lib/sitka/sitka"

export interface PetState {
    readonly name: string
    readonly age: number
    readonly vaccines: Vaccines
}

export interface Vaccines {
    readonly rabies: boolean
    readonly evil: boolean
    readonly gas: boolean
}

export class PetModule extends SitkaModule<PetState, AppModules> {
    public moduleName: string = "pets"
    
    public defaultState: PetState = {
        name: "",
        age: 0,
        vaccines: {
            rabies: false,
            evil: false,
            gas: false,
        },
    }

    public *handlePet(name: string): {} {
        yield put(this.setState({
            name: `${name}-${new Date().getTime()}`,
            age: new Date().getTime(),
            vaccines: {
                rabies: new Date().getTime() % 2 == 0,
                evil: new Date().getTime() % 3 == 0,
                gas: new Date().getTime() % 4 == 0,
            },      
        }))
    }

    public *handleUpdatePetEvil(): {} {
        const currentPet: PetState = yield select(this.getPet)

        // this will normally be in a util
        const updatedPet = {
            ...currentPet, 
            vaccines: {
                ...currentPet.vaccines,
                evil: true,
            },
        }

        yield put(this.setState(updatedPet))
    }

    private getPet(state: AppState): PetState {
        return state.pets
    }
}