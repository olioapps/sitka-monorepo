import { modules, Sitka, sitka, SitkaModules } from "@cashew/common"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./App"
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"

export const store = sitka.createStore()
export type Sitka = Sitka
export type SitkaModules = SitkaModules
export const sitkaModules = modules

ReactDOM.render(
    <Provider store={store}>
        <App sitka={sitka} modules={modules} />
    </Provider>,
    document.getElementById("root") as HTMLElement,
)
registerServiceWorker()
