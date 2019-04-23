import { createStore, combineReducers } from 'redux';

import { app } from './reducers';
import { blog } from './reducers';
import { nav } from './reducers';
import { user } from './reducers';
import { home } from './reducers';
import { login } from './reducers';

const reducers = combineReducers({
	app,  blog, nav, user, login
});

const store = createStore(reducers,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const token = localStorage.getItem('token');
if(token) {
	store.dispatch({type: 'USER_AUTHENTICATE'})
}
export default store;