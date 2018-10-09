import { INITIAL_STATE } from "../../index"
export interface IncrementAction {
    readonly type: string
}

export interface IDecrementAction {
    readonly type: string
}

export interface IResetAction {
    readonly type: string
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

const actions = { increment, decrement, reset }

export { actions, counter }
