import type { PayloadAction } from '@reduxjs/toolkit';
import { type ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { ProfileDto, profileActions } from './profileSlice';

function* getProfileInfoWorker({ payload }: PayloadAction<ProfileDto>) {
  try {
    yield put(profileActions.setProfileInfo(payload));
  } catch (e) {
    console.error(e);
  }
}

export function* profileSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(`profile/getProfileInfo`, getProfileInfoWorker);
}
