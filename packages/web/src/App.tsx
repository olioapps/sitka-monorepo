import {
    actions,
    AppState,
    DecrementAction,
    IncrementAction,
    ResetAction,
} from "@cashew/common"

import { store } from "./index"

import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import "./App.css"
import logo from "./logo.svg"

interface AppProps {
    readonly appState: AppState
    readonly actions: {
        increment: () => IncrementAction
        decrement: () => DecrementAction
        reset: () => ResetAction
    }
}

class App extends React.Component<AppProps> {
    constructor(props: AppProps) {
        super(props)

        this.incrementCounter = this.incrementCounter.bind(this)
        this.decrementCounter = this.decrementCounter.bind(this)
        this.resetCounter = this.resetCounter.bind(this)
    }

    public incrementCounter(): void {
        this.props.actions.increment()
    }

    public decrementCounter(): void {
        this.props.actions.decrement()
    }

    public resetCounter(): void {
        this.props.actions.reset()
    }

    public render(): JSX.Element {
        const { counter } = store.getState()

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">
                        Welcome to React Counter => {counter}
                    </h1>
                </header>
                <div className="wrap">
                    <div className="wrap-btns">
                        <button onClick={this.incrementCounter} id="increment">
                            +
                        </button>
                        <button onClick={this.decrementCounter} id="decrement">
                            -
                        </button>
                        <button onClick={this.resetCounter} id="reset">
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    () => store.getState(),
    dispatch => ({ actions: bindActionCreators(actions, dispatch) }),
)(App)
