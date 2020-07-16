import { put, takeEvery, select } from 'redux-saga/effects';

import { api, IAppSte } from 'store';
import storage from 'services/storage';
import { getUserAction } from 'store/user';
import { ISigninSuccess, ISignUpSuccess } from 'types/IAuth';

import { resetAllCommonAction, setLoaded, setLoading } from '../common';
import {
  IInitAction,
  ISigninAction,
  ISignupAction,
  AuthActions,
  authResetAction,
  initSuccessAction,
  signinSuccessAction,
  signupSuccessAction,
  setIsAuthAction,
} from './auth';



export function* sagaSignin({ payload }: ISigninAction) {
  const actionType = AuthActions.SIGNIN;
  try {
    yield put(setLoading({ actionType }));
    const res: ISigninSuccess = yield api.authApi.signin(payload);
    const token = res.token;
    yield put(signinSuccessAction(res));
    api.baseApi.setToken(token);
    yield put(setLoaded({ actionType }));
  } catch (error) {}
}

export default function*(): Generator {
  yield takeEvery(AuthActions.SIGNIN, sagaSignin);
  yield takeEvery(AuthActions.SIGNUP, sagaSignup);
}
