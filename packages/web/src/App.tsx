import {
    actions,
    // AppState,
    // DecrementAction,
    // IncrementAction,
    // ResetAction,
    // reduxDispatch,
} from "@cashew/common"

import * as React from "react"

// import { AnyAction } from "redux"
import { connect } from "react-redux"
import { store } from "./index"
import { bindActionCreators } from "redux"
import logo from "./logo.svg"
import "./App.css"

interface AppProps {
    readonly actions: {
        incrementBy: (counter: number) => void
        decrement: () => void
        reset: () => void
        incrementOther: () => void
    }
    readonly reducer: {
        counter: number
    }
    // readonly actionTypes: {
    //     increment: string
    //     decrement: string
    //     decrementBy20: string
    //     reset: string
    // }
}

// const actions: {
//     incrementOther: () => ActionWithPayload<undefined, any>;
//     increment: () => ActionWithPayload<undefined, any>;
//     incrementBy: (payload: number) => ActionWithPayload<number, any>;
//     decrement: () => ActionWithPayload<...>;
//     decrementBy20: () => ActionWithPayload<...>;
//     reset: () => ActionWithPayload<...>;
// }

class App extends React.Component<AppProps> {
    constructor(props: AppProps) {
        super(props)

        this.incrementCounter = this.incrementCounter.bind(this)
        this.decrementCounter = this.decrementCounter.bind(this)
        this.resetCounter = this.resetCounter.bind(this)
    }

    public incrementCounter(): void {
        this.props.actions.incrementBy(12)
    }

    public decrementCounter(): void {
        this.props.actions.decrement()
    }

    public resetCounter(): void {
        this.props.actions.reset()
    }

    public render(): JSX.Element {
        const { actions: a, reducer } = this.props
        /* tslint:disable */
        debugger
        console.log(a)
        /* tslint:enable */
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">
                        Welcome to React Counter => {reducer.counter}
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
