import {
    TestState,
} from "@cashew/common"

import { store } from "./index"

import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import "./App.css"
import { Sitka, SitkaModules, sitkaModules } from "./index"
import logo from "./logo.svg"

interface AppProps {
    readonly sitka: Sitka
    readonly modules: SitkaModules
    readonly test?: TestState
}

class App extends React.Component<AppProps> {
    constructor(props: AppProps) {
        super(props)

    }

    public render(): JSX.Element {
        const { test } = this.props.modules
        const { test: testState } = this.props
        /* tslint:disable */
        debugger
        /* tslint:enable */

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">
                        Welcome to React Counter { testState && testState.count }
                    </h1>
                </header>
                <div className="wrap">
                    <div className="wrap-btns">
                        {/* <button onClick={this.incrementCounter} id="increment"> */}
                        <button id="increment" onClick={test.handleIncrementCount}>
                            +
                        </button>
                        {/* <button onClick={this.decrementCounter} id="decrement"> */}
                        <button  id="decrement">
                            -
                        </button>
                        {/* <button onClick={this.resetCounter} id="reset"> */}
                        <button  id="reset">
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
    dispatch => ({ actions: bindActionCreators(sitkaModules.test.handleIncrementCount, dispatch) }),
)(App)
