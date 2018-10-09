"use strict";
exports.__esModule = true;
var redux = require("redux");
var increment = function () { return ({
    type: "INCREMENT"
}); };
var decrement = function () { return ({
    type: "DECREMENT"
}); };
var reset = function () { return ({
    type: "RESET"
}); };
var appState = {
    counter: 0
};
exports.appState = appState;
var INITIAL_STATE = appState;
var counter = function (state, action) {
    if (state === void 0) { state = INITIAL_STATE.counter; }
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        case "RESET":
            return INITIAL_STATE.counter;
        default:
            return state;
    }
};
exports.appReducer = redux.combineReducers({ counter: counter });
var store = redux.createStore(exports.appReducer);
exports.store = store;
var actions = { increment: increment, decrement: decrement, reset: reset };
exports.actions = actions;
