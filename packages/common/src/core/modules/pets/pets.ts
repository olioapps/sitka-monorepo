import { AppModules } from "../../index"

import { Action } from "redux"

import { put } from "redux-saga/effects"

import { SitkaModule } from "../../../lib/sitka/sitka"

export interface PetState {
    readonly name: string
    readonly age: number
}

export class PetModule extends SitkaModule<PetState, AppModules> {
    public moduleName = (): string => "pets"
    
    public defaultState = (): PetState => ({
        name: "",
        age: 0,
    })

    public *handlePet(name: string): IterableIterator<{}> {
        yield put(this.setPet(`${name}-${new Date().getTime()}`))
    }

    private setPet(name: string): Action {
        return this.createAction({name, age: new Date().getTime()})
    }
}