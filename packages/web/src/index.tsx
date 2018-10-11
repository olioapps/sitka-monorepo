import { actions, runMiddleware, storeCreatorWrapper } from "@cashew/common"
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
        <App actions={actions} appState={store.getState()} />
    </Provider>,
    document.getElementById("root") as HTMLElement,
)
registerServiceWorker()
