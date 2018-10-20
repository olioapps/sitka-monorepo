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

import * as React from "react"

import { connect } from "react-redux"

import { Action, Dispatch } from "redux"

import "./App.css"

import logo from "./logo.svg"

interface ReduxState {
    readonly color: ColorState
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
        const { color, counter, sitka, increment, decrement } = this.props
        const modules: AppModules = sitka.getModules()
        const handleColor = () => modules.color.handleColor("red")

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
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state: AppState): ReduxState => {
        return {
            color: state.color,
            counter: state.counter,
            sitka: state.sitka,
        }
    },
    (dispatch: Dispatch<Action>): ReduxActions => ({
        decrement: () => dispatch(actions.decrement()),
        increment: () => dispatch(actions.increment()),
    }),
)(App)
