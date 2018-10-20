import {
    Sitka,
} from "@cashew/common/src/lib/sitka/sitka"

import {
    AppModules,
    AppState,
} from "@cashew/common/src/core/index"

import {
    ColorState,
} from "@cashew/common/src/core/modules/color/color"

import * as React from "react"

import { connect } from "react-redux"

import "./App.css"

import logo from "./logo.svg"

interface ReduxState {
    readonly color: ColorState
    readonly sitka: Sitka<AppModules>
}

type ComponentProps = ReduxState
class App extends React.Component<ComponentProps> {
    constructor(props: ComponentProps) {
        super(props)
    }

    public render(): JSX.Element {
        const { color, sitka } = this.props
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
                        {`Color: ${color.color}`}
                    </div>
                </header>
                <div className="wrap">
                    <div className="wrap-btns">
                        <button id="increment" onClick={ handleColor }>
                            +
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

// type ConectState = AppState & SitkaModules
export default connect(
    (state: AppState): ReduxState => {
        return {
            color: state.color,
            sitka: state.sitka,
        }
    },
    null,
)(App)
