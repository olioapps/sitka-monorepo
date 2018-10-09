import * as redux from "redux"

export interface IncrementAction {
    readonly type: string
}

export interface IDecrementAction {
    readonly type: string
}

export interface IResetAction {
    readonly type: string
}

export interface IAppState {
    readonly counter: number
}

const increment = (): IncrementAction => ({
    type: "INCREMENT",
})

const decrement = (): IDecrementAction => ({
    type: "DECREMENT",
})

const reset = (): IResetAction => ({
    type: "RESET",
})

const appState: IAppState = {
    counter: 0,
}

const INITIAL_STATE: IAppState = appState

const counter = (
    state = INITIAL_STATE.counter,
    action: IncrementAction | IDecrementAction,
): number => {
    switch (action.type) {
        case "INCREMENT":
            return state + 1
        case "DECREMENT":
            return state - 1
        case "RESET":
            return INITIAL_STATE.counter
        default:
            return state
    }
}

export const appReducer = redux.combineReducers({ counter })
const store = redux.createStore(appReducer)


const actions = { increment, decrement, reset }

export { actions, appState, store }
