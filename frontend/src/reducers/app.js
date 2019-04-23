export default (state={user: null}, action) => {
	switch(action.type){
		case 'APP_LOADED':
			console.log('REDUX: App Loaded');
			return {
				...state,
				user: action.data
			}
		case 'USER_LOGIN':
			console.log('user login');
			if(action.data.code==204) {
				return {
					...state,
					error: 'invalid login'
				}
			} else if(action.data.code==200) {
				localStorage.setItem('user', JSON.stringify(action.data.user));
				return {
					...state,
					user: action.data.user
				}
			}
		case 'USER_LOGOUT':
			console.log('user logout');
			localStorage.setItem('user', null);
			return {
				...state,
				user: null
			}
		default:
			return state;
	}
}