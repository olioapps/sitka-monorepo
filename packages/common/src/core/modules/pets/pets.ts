import { AppModules, AppState } from "../../index"

import { put, select } from "redux-saga/effects"

import { SitkaModule } from "../../../lib/sitka/sitka"
import { IncrementAction } from "../counter/redux"

import { Dispatch, Action, Middleware, MiddlewareAPI } from "redux"

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

        // this will actually dispatch and invoke the handler
        this.handleAlert()
    }

    // tslint:disable-next-line:no-unused-variable
    provideSubscriptions() {
        // you can subscribe to multiple actions
        const { moduleName } = this

        return [
            this.createSubscription("MODULE_PETS_CHANGE_STATE", function*(action: {}) {
                console.log(moduleName, "subscription heard -->", action)
            }),

            this.createSubscription("INCREMENT", function*(action: IncrementAction) {
                console.log(moduleName, "subscription heard -->", action)
            }),
        ]
    }

    provideMiddleware(): Middleware[] {
        const { moduleName } = this

        // these don't have to be inline here, they are for convenience
        return [
            (store: MiddlewareAPI<Dispatch, AppState>) => (next: Function) => (action: Action) => {
                console.log(moduleName, "middleware heard -->", action)
                console.log(moduleName, "current state:", store.getState().pets)
                return next(action)
            },
        ]
    }

    private *handleAlert(): {} {
        alert("my pet turned evil!")
    }

    private getPet(state: AppState): PetState {
        return state.pets
    }
}