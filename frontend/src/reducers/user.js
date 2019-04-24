/* 
	Reducer: user.js 
	Description: users state reducer
	Modifies: users: []/json (users collection from db)
*/

export default (state={users: [], error: ''}, action) => {
	switch(action.type){
		case 'USERS_LOADED':
			console.log('REDUX: Get Users');
			return {
				...state,
				users: action.data.users
			}
		case 'USERS_ADD':
			console.log('REDUX: Add a User');
			console.log(action.data.status)
			return {
				...state,
				users: ([action.data.user]).concat(state.users)
			}
		case 'USERS_DELETE':
			console.log('REDUX: Delete a User');
			return {
				...state,
				users: state.users.filter((user) => user._id !== action.id),
			}
		case 'ERROR_SIGNUP':
			console.log('REDUX: Form Error');
			return {
				...state,
				error: action.data.error
			}
		
		default:
			return state;
	}
}