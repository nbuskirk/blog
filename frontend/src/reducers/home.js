export default (state={posts: []}, action) => {
	switch(action.type){
		case 'HOME_PAGE_LOADED':
			console.log('homepage loaded');
			return {
				...state,
				posts: action.data.posts
			}
		case 'SUBMIT_POST':
			console.log('submit post');
			return {
				...state,
				posts: ([action.data.post]).concat(state.posts)
			}
		case 'DELETE_POST':
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.id),
			}
		default:
			return state;
	}
}