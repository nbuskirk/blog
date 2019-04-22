export default (state={users: []}, action) => {
	switch(action.type){
		case 'USERS_LOADED':
			console.log('USERS LIST FETCH');
			return {
				...state,
				users: action.data.users
			}
		case 'USERS_ADD':
			console.log('USERS_ADD');
			return {
				...state,
				users: ([action.data.user]).concat(state.users)
			}
		case 'USERS_DELETE':
			console.log('delete user');
			return {
				...state,
				users: state.users.filter((user) => user._id !== action.id),
			}
		default:
			return state;
	}
}