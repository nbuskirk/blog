import { createStore, combineReducers } from 'redux';

import { blog } from './reducers';
import { nav } from './reducers';
import { user } from './reducers';

const reducers = combineReducers({
	blog, nav, user
});

const store = createStore(reducers,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const token = localStorage.getItem('token');
if(token) {
	store.dispatch({type: 'USER_AUTHENTICATE'})
}
export default store;