import { AppModules } from "../../index"

import { Action } from "redux"

import { put } from "redux-saga/effects"

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
    public moduleName = (): string => "pets"
    
    public defaultState = (): PetState => ({
        name: "",
        age: 0,
        vaccines: {
            rabies: false,
            evil: false,
            gas: false,
        },
    })

    public *handlePet(name: string): IterableIterator<{}> {
        yield put(this.setPet(`${name}-${new Date().getTime()}`))
    }

    private setPet(name: string): Action {
        return this.createAction({
            name, 
            age: new Date().getTime(),
            vaccines: {
                rabies: new Date().getTime() % 2 == 0,
                evil: new Date().getTime() % 3 == 0,
                gas: new Date().getTime() % 4 == 0,
            },      
        })
    }
}