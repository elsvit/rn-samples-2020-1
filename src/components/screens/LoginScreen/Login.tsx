import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';

import { IAppState } from 'store';
import { signinAction } from 'store/auth';
import { ISignInUser } from 'types/IAuth';
import { Screen } from 'types/INavigation';

import LoginView from './LoginView';

const Login = (props: NavigationInjectedProps) => {
  const dispatch = useDispatch();

  const token = useSelector((state: IAppState) => state.auth.token);
  if (token) {
    props.navigation.navigate(Screen.TabNavigator);
  }

  const onSignIn = (user: ISignInUser) => {
    dispatch(signinAction(user));
  };

  const onSignUp = () => {
    props.navigation.navigate(Screen.SignUp);
  };

  return <LoginView onSignIn={onSignIn} onSignUp={onSignUp} />;
};

export default Login;
