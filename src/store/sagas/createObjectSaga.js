import { delay, put } from 'redux-saga/effects';
import { createObjectAction } from '../actions';

export function* createObjectAsync(data) { // worker
    yield delay(2000); // to be replaced with backend call   
    yield put(createObjectAction(data.value));
}
