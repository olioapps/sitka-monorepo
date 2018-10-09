import {
  actions,
  IAppState,
  IDecrementAction,
  IncrementAction,
  IResetAction,
  store
} from "@cashew/common";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./App.css";
import logo from "./logo.svg";

interface IAppProps {
  readonly appState: IAppState;
  readonly actions: {
    increment: () => IncrementAction;
    decrement: () => IDecrementAction;
    reset: () => IResetAction;
  };
}

class App extends React.Component<IAppProps> {
  constructor(props: IAppProps) {
    super(props);

    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
    this.resetCounter = this.resetCounter.bind(this);
  }

  public incrementCounter() {
    this.props.actions.increment();
  }

  public decrementCounter() {
    this.props.actions.decrement();
  }

  public resetCounter() {
    this.props.actions.reset();
  }

  public render() {
    const { counter } = store.getState();

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Counter => {counter}</h1>
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
    );
  }
}

export default connect(
  (state: IAppState) => store.getState(),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(App);
