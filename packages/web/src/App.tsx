import {
    AppState,
    modules,
    // sitkaModules as modules,
    Sitka,
    SitkaModules,
    TestState,
} from "@cashew/common"

import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import "./App.css"
// import {  } from "./index"
import logo from "./logo.svg"

interface AppProps {
    readonly sitka: Sitka
    readonly modules: SitkaModules
}

interface ReduxState {
    readonly test: TestState
}

type ComponentProps = AppProps & ReduxState
class App extends React.Component<ComponentProps> {
    constructor(props: ComponentProps) {
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
                        Welcome to React Counter {testState && testState.count}
                    </h1>
                </header>
                <div className="wrap">
                    <div className="wrap-btns">
                        {/* <button onClick={this.incrementCounter} id="increment"> */}
                        <button id="increment" onClick={test.handleIncrementCount}>
                            +
                        </button>
                        {/* <button onClick={this.decrementCounter} id="decrement"> */}
                        {/* <button id="decrement">-</button> */}
                        {/* <button onClick={this.resetCounter} id="reset"> */}
                        {/* <button id="reset">Reset</button> */}
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
            test: state.test,
        }
    },
    dispatch => ({ actions: bindActionCreators(modules.test.handleIncrementCount, dispatch) }),
)(App)
