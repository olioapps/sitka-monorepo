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

const defaultState = {
    counter: 0,
}

const counter = (
    state = defaultState.counter,
    action: IncrementAction | DecrementAction,
): number => {
    switch (action.type) {
        case "INCREMENT":
            return state + 1
        case "DECREMENT":
            return state - 1
        case "RESET":
            return defaultState.counter
        default:
            return state
    }
}

const actions = { increment, decrement, reset }

export { actions, counter, defaultState }
