import {
    Sitka,
} from "@cashew/common/dist/lib/sitka/sitka"

import {
    AppModules,
    AppState,
} from "@cashew/common/dist/core/index"

import {
    actions,
} from "@cashew/common/dist/core/modules/counter/redux"

import {
    ColorState,
} from "@cashew/common/dist/core/modules/color/color"

import {
    PetState,
    Vaccines,
} from "@cashew/common/dist/core/modules/pets/pets"

import * as React from "react"

import { connect } from "react-redux"

import { Action, Dispatch } from "redux"

import "./App.css"

import logo from "./logo.svg"

interface ReduxState {
    readonly color: ColorState
    readonly pets: PetState
    readonly counter: number,
    readonly sitka: Sitka<AppModules>
}

interface ReduxActions {
    readonly decrement: () => void
    readonly increment: () => void
}

type ComponentProps = ReduxState & ReduxActions
class App extends React.Component<ComponentProps> {
    constructor(props: ComponentProps) {
        super(props)
    }

    public render(): JSX.Element {
        const { color, counter, sitka, increment, decrement, pets } = this.props
        const modules: AppModules = sitka.getModules()
        const handleColor = () => modules.color.handleColor("red")
        const handlePet = () => modules.pets.handlePet("marz")

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">
                        Welcome to React
                    </h1>
                    <div>
                        Color {color.color}
                    </div>
                    <div>
                        Number {counter}
                    </div>
                    <div>
                        Pet {pets.name} {pets.age} {this.renderVaccines(pets.vaccines)}
                    </div>
                </header>
                <div className="wrap">
                    <div className="wrap-btns">
                        <button id="increment" onClick={ handleColor }>
                            Update color
                        </button>
                        <button id="increment" onClick={ increment }>
                            Increment number
                        </button>
                        <button id="decrement" onClick={ decrement }>
                            Decrement number
                        </button>
                        <button id="pet" onClick={ handlePet }>
                            Update pet
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    private renderVaccines(vaccines: Vaccines): JSX.Element {
        return (
            <span>{JSON.stringify(vaccines)}</span>
        )
    }
}

export default connect(
    (state: AppState): ReduxState => {
        return {
            color: state.color,
            counter: state.counter,
            pets: state.pets,
            sitka: state.sitka,
        }
    },
    (dispatch: Dispatch<Action>): ReduxActions => ({
        decrement: () => dispatch(actions.decrement()),
        increment: () => dispatch(actions.increment()),
    }),
)(App)
