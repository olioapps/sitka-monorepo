import { AppModules } from "../../index"

import { Action } from "redux"

import { put } from "redux-saga/effects"

import { SitkaModule } from "../../../lib/sitka/sitka"

export class ColorModule extends SitkaModule<string, AppModules> {
    public moduleName = (): string => "color"
    
    public defaultState = (): string => ""

    public *handleColor(color: string): IterableIterator<{}> {
        yield put(this.setColor(`${color}-${new Date().getTime()}`))
    }

    private setColor(color: string): Action {
        return this.createAction(color)
    }
}