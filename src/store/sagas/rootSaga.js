import { all, takeEvery } from 'redux-saga/effects';
import { editObjectAsync } from './editObjectSaga';
import { createObjectAsync } from './createObjectSaga';

/* responsible of the side effects and since it is a redux middleware it can handle/dispatch redux functions*/
export function *rootSaga() {
  // list of watchers
  yield all([
    takeEvery("EDIT_OBJECT", editObjectAsync),
    takeEvery("CREATE_OBJECT", createObjectAsync)
  ]);
}