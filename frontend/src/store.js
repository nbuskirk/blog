import { createStore, combineReducers } from 'redux';

import { app } from './reducers';
import { blog } from './reducers';
import { user } from './reducers';

const reducers = combineReducers({
	app,  blog, user
});

const store = createStore(reducers,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;