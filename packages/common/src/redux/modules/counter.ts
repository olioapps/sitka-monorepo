import { AppState, INITIAL_STATE } from "../../redux"
export interface IncrementAction {
    readonly type: string
}

export interface DecrementAction {
    readonly type: string
}

export interface ResetAction {
    readonly type: string
}

// const increment = (): IncrementAction => ({
//     type: "INCREMENT",
// })

// const decrement = (): DecrementAction => ({
//     type: "DECREMENT",
// })

// const reset = (): ResetAction => ({
//     type: "RESET",
// })

const counterHandlers = {
    increment(state: AppState) {
        return {
            ...state,
            counter: state.counter + 1,
        }
    },
    incrementBy(state: AppState, counterState: number) {
        return {
            ...state,
            counter: state.counter + counterState,
        }
    },
    decrement(state: AppState) {
        return {
            ...state,
            counter: state.counter - 1,
        }
    },
    decrementBy20(state: AppState) {
        return {
            ...state,
            counter: state.counter - 20,
        }
    },
    reset(state: AppState) {
        return {
            ...state,
            counter: 0,
        }
    },
}

const otherHandlers = {
    incrementOther(state: AppState) {
        return {
            ...state,
            counter: state.counter + 1,
        }
    },
}

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

export { counter, counterHandlers, otherHandlers }
