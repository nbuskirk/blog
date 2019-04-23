
export default (state={user: [], error: ''}, action) => {
	switch(action.type){
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
		
		
		default:
			return state;
	}
}