import {
    actions,
    IAppState,
    IDecrementAction,
    IncrementAction,
    IResetAction,
    store,
} from "@cashew/common"
import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import "./App.css"
import logo from "./logo.svg"

interface IAppProps {
    readonly appState: IAppState
    readonly actions: {
        increment: () => IncrementAction
        decrement: () => IDecrementAction
        reset: () => IResetAction
    }
}

class App extends React.Component<IAppProps> {
    constructor(props: IAppProps) {
        super(props)

        this.incrementer = this.incrementer.bind(this)
    }

    public incrementer() {
        const {
            actions: { increment },
        } = this.props
        /* tslint:disable */
        increment()
        console.log(this.props.appState)
        console.log("from cpx", store.getState())
        debugger
        /* tslint:enable */
    }

    public render() {
        const { counter } = store.getState()
        const { decrement, reset } = actions
        /* tslint:disable */
        console.log("rendered")
        /* tslint:enable */
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React => {counter}</h1>
                </header>
                <div className="wrap">
                    <h1 id="counter">COUNTER</h1>
                    <div className="wrap-btns">
                        <button onClick={this.incrementer} id="increment">
                            +
                        </button>
                        <button onClick={decrement} id="decrement">
                            -
                        </button>
                        <button onClick={reset} id="reset">
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state: IAppState) => store.getState(),
    dispatch => ({ actions: bindActionCreators(actions, dispatch) }),
)(App)
