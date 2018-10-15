import {
    // actions,
    // actionTypes,
    runMiddleware,
    storeCreatorWrapper,
    // reducer,
    // need to pass in reducer here, that's where redux-instant state lives right now
} from "@cashew/common"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./App"
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"

export const store = storeCreatorWrapper()()

runMiddleware()

ReactDOM.render(
    <Provider store={store}>
        <App
            reducer={{counter: 0}}
            // actions={actions}
            // actionTypes={actionTypes}
        />
    </Provider>,
    document.getElementById("root") as HTMLElement,
)

registerServiceWorker()
