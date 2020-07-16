import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { initApiServices } from 'services/api';
import config from 'constants/config';

import auth, { AuthStateT } from './auth';
import user, { UserStateT } from './user';
import common, { CommonStateT } from './common';
import sagas from './sagas';

export interface IAppState {
  auth: AuthStateT;
  user: UserStateT;
  common: CommonStateT;
}

console.log(`API_URL: ${config.baseURL}${config.apiPath}`); // todo remove
export const api = initApiServices(`${config.baseURL}${config.apiPath}`);

const reducers = combineReducers<IAppState>({
  auth,
  user,
  common,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagas.forEach((saga: any) => sagaMiddleware.run(saga));

export default store;
