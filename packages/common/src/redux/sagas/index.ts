import { call, takeEvery } from "redux-saga/effects"
import { sitkaMeta } from "../index"

/* tslint:disable */
const reset = () => console.log("reset from the saga")
/* tslint:enable */

export default function* rootSaga(): IterableIterator<{}> {
    yield [
        takeEvery("RESET", reset),
    ],
    yield call(sitkaMeta.sagaRoot)
}