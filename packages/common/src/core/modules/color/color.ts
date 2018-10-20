import { AppModules } from "../../index"
import { put } from "redux-saga/effects"
import { SitkaModule } from "../../../lib/sitka/sitka"

export type ColorState = string | null

export class ColorModule extends SitkaModule<ColorState, AppModules> {
    public moduleName: string = "color"
    public defaultState: ColorState = null

    public *handleColor(color: string): IterableIterator<{}> {
        yield put(this.setState(`${color}-${new Date().getTime()}`))
    }

    // tslint:disable-next-line:no-unused-variable
    private subscribeToActions() {
        // you can subscribe to multiple actions
        const { moduleName } = this
        return [
            this.createSubscription("INCREMENT", function*(action: {}) {
                console.log(moduleName, "subscription heard -->", action)
            }),
        ]
    }
}