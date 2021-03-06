/* 
	Reducer: app.js 
	Description: main application container reducer
	Modifies: user: null/json (user collection from db)
*/

export default (state={user: null, error: null}, action) => {
	switch(action.type){
		case 'APP_LOADED':
			console.log('REDUX: App Loaded / Get User');
			return {
				...state,
				user: action.data
			}
		case 'ERROR_LOGIN':
			console.log('REDUX: Form Error');
			return {
				...state,
				error: action.data.error
			}
		case 'USER_LOGIN':
			console.log('REDUX: User Login');
			localStorage.setItem('user', JSON.stringify(action.data.user));
			return {
				...state,
				user: action.data.user
			}
		case 'USER_LOGOUT':
			console.log('REDUX: User Logout');
			localStorage.setItem('user', null);
			return {
				...state,
				user: null
			}
		default:
			return state;
	}
}