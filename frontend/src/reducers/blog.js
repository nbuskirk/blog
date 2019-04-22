// concat/filter return new arr

export default (state={posts: []}, action) => {
	switch(action.type){
		case 'BLOG_LOADED':
			console.log('blog loaded');
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
			console.log('delete post');
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.id),
			}
		case 'SET_POST':
			console.log('select post');
			return {
				...state,
				postToEdit: action.post
			}
		case 'EDIT_CANCEL':
			console.log('cancel edit on post');
			return {
				...state,
				postToEdit: undefined
			}
		default:
			return state;
	}
}