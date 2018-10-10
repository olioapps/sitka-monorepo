import { INITIAL_STATE } from "../../redux"
export interface IncrementAction {
    readonly type: string
}

export interface DecrementAction {
    readonly type: string
}

export interface ResetAction {
    readonly type: string
}

const increment = (): IncrementAction => ({
    type: "INCREMENT",
})

const decrement = (): DecrementAction => ({
    type: "DECREMENT",
})

const reset = (): ResetAction => ({
    type: "RESET",
})

const counter = (
    state = INITIAL_STATE.counter,
    action: IncrementAction | DecrementAction,
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
