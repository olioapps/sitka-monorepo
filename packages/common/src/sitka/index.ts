import { call, put, select } from "redux-saga/effects"
import { BaseMap, ConnectedClass, ConnectedClassAction, Sitka, SitkaMeta } from "./sitka"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface TestState extends BaseMap {
    readonly count: number
    readonly food: string
}

class Test extends ConnectedClass<TestState, Sitka<SitkaModules, AppState>> {

    public moduleName = (): string => "test"

    public defaultState = (): TestState => ({
        count: 0,
        food: "",
    })

    public *handleCount(a: number, b: number): IterableIterator<{}> {
        yield put(this.setCount(a, b))
        yield put(this.setFood("sphagetti"))
    }

    public *handleIncrementCount(): IterableIterator<{}> {
        const currentCount: number = yield select(this.getCount, this.reduxKey())
        yield put(this.setCount(currentCount, 1))

        // call another module's action creator directly
        if (this.sitka !== undefined) {
            yield put(this.sitka.getModules().test3.setDayClear())
        }
    }

    // reducer-facing actions should be private
    private setCount(a: number, b: number): ConnectedClassAction<TestState> {
        return this.createAction({
            count: a + b,
        })
    }

    // private setBigCount(): ConnectedClassAction<TestState> {
    //     return this.createAction({
    //         count: 1000,
    //     })
    // }

    private setFood(food: string): ConnectedClassAction<TestState> {
        return this.createAction({
            food,
        })
    }

    private getCount(state: AppState): number {
        return state.test.count
    }

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface Test2State extends BaseMap {
    readonly pet: string
}

// tslint:disable-next-line:max-classes-per-file
class Test2 extends ConnectedClass<Test2State, Sitka<SitkaModules, AppState>> {

    public moduleName = (): string => "test2"

    public defaultState = (): Test2State => {
        return {
            pet: "",
        }
    }

    public *handlePet(name: string): IterableIterator<{}> {
        yield put(this.setPet(name))

        // call another module's saga
        if (this.sitka !== undefined) {
            yield call(this.sitka.getModules().test3.handleDay, "MONDAY")
        }
    }

    private setPet(pet: string): ConnectedClassAction<Test2State> {
        return this.createAction({pet})
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface Test3State extends BaseMap {
    readonly day: string
}

// tslint:disable-next-line:max-classes-per-file
class Test3 extends ConnectedClass<Test3State, Sitka<SitkaModules, AppState>> {

    public moduleName = (): string => "test3"

    public defaultState = (): Test3State => ({
        day: "",
    })

    public setDayClear(): ConnectedClassAction<Test3State> {
        return this.createAction({day: this.defaultState().day})
    }

    public *handleDay(day: string): IterableIterator<{}> {
        yield put(this.setDay(day))
    }

    private setDay(day: string): ConnectedClassAction<Test3State> {
        return this.createAction({day})
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface OtherState {
    readonly color: string
    readonly beer: string
}

export const otherDefaultState = {
    beer: "",
    color: "",
}

interface SitkaModules {
    readonly test: Test
    readonly test2: Test2
    readonly test3: Test3
}

export interface AppState {
    readonly test: TestState
    readonly test2: Test2State
    readonly test3: Test3State
    readonly other: OtherState
}

const sitka = new Sitka<SitkaModules, AppState>()

sitka.register(new Test())
sitka.register(new Test2())
sitka.register(new Test3())

const modules = sitka.getModules()
/* tslint:disable */
console.log(modules)
/* tslint:enable */

export {
    modules,
    sitka,
    SitkaModules,
    SitkaMeta,
    Sitka,
    TestState,
}