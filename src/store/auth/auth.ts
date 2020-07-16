import { Reducer } from 'redux';
import {
  IChangePasswordWithToken,
  ISignInUser,
  ISignUpUser,
  IInitSuccess,
  ISigninSuccess,
} from 'types/IAuth';

// Actions
export enum AuthActions {
  INIT = 'auth/INIT',
  INIT_SUCCESS = 'auth/INIT_SUCCESS',
  SIGNIN = 'auth/SIGNIN',
  SIGNIN_SUCCESS = 'auth/SIGNIN_SUCCESS',
  SIGNUP = 'auth/SIGNUP',
  SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS',
  SET_IS_AUTH = 'auth/SET_IS_AUTH',
  AUTH_RESET = 'auth/RESET',
  LOGOUT = 'LOGOUT',
}

export type AuthLoadableT =
  | typeof AuthActions.SIGNIN
  | typeof AuthActions.SIGNUP
  | typeof AuthActions.LOGOUT;



export interface ISigninAction {
  type: typeof AuthActions.SIGNIN;
  payload: ISignInUser;
}

interface ISigninSuccessAction {
  type: typeof AuthActions.SIGNIN_SUCCESS;
  payload: ISigninSuccess;
}

interface ILogoutAction {
  type: typeof AuthActions.LOGOUT;
}

type AuthActionsT =
  | ISigninAction
  | ISigninSuccessAction
  | ILogoutAction;

export const signinAction = (user: ISignInUser): ISigninAction => ({
  type: AuthActions.SIGNIN,
  payload: user,
});

export const signinSuccessAction = (payload: ISigninSuccess): ISigninSuccessAction => ({
  type: AuthActions.SIGNIN_SUCCESS,
  payload,
});

export const logoutAction = (): ILogoutAction => ({
  type: AuthActions.LOGOUT,
});

//Reducer
interface IAuthState {
  token: Maybe<string>;
  expire: Maybe<number>;
}

export type AuthStateT = Readonly<IAuthState>;

const initialState: IAuthState = {
  token: null,
  expire: null,
};

const reducer: Reducer<AuthStateT> = (state: IAuthState = initialState, action: AuthActionsT) => {
  switch (action.type) {
    case AuthActions.INIT_SUCCESS:
    case AuthActions.SIGNIN_SUCCESS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default reducer;
