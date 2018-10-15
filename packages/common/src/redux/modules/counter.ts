import { AppState } from "../../redux"

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

export { counterHandlers, otherHandlers }
