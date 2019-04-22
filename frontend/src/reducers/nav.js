export default (state={user: ''}, action) => {
	switch(action.type){
		case 'NAV_LOADED':
			console.log('navigation loaded');
			return {
				...state,
				user: ''
			}
		default:
			return state;
	}
}