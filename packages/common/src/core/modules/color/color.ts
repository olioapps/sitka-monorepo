import { AppModules } from "../../index"

import { Action } from "redux"

import { put } from "redux-saga/effects"

import { SitkaModule } from "../../../lib/sitka/sitka"

export type ColorState = string | null

export class ColorModule extends SitkaModule<ColorState, AppModules> {
    public moduleName = (): string => "color"
    
    public defaultState = (): ColorState => null

    public *handleColor(color: string): IterableIterator<{}> {
        yield put(this.setColor(`${color}-${new Date().getTime()}`))
    }

    private setColor(color: string): Action {
        return this.createAction(color)
    }
}