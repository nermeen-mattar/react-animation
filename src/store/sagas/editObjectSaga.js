import { delay, put } from 'redux-saga/effects';
import { editObjectAction } from '../actions';

export function* editObjectAsync(data) { // worker
    yield delay(2000); // to be replaced with backend call  
    yield put(editObjectAction(data.value));
}
