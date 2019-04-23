/* 
	Reducer: blog.js 
	Description: blog reducer
	Modifies: posts: []/json (post collection from db)
*/

export default (state={posts: []}, action) => {
	switch(action.type){
		case 'BLOG_LOADED':
			console.log('REDUX: Get Posts');
			return {
				...state,
				posts: action.data.posts
			}
		case 'SUBMIT_POST':
			console.log('REDUX: Submit a Post');
			return {
				...state,
				posts: ([action.data.post]).concat(state.posts)
			}
		case 'DELETE_POST':
			console.log('REDUX: Delete a Post');
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.id),
			}
		case 'SET_POST':
			console.log('REDUX: Edit a Post');
			return {
				...state,
				postToEdit: action.post
			}
		case 'EDIT_CANCEL':
			console.log('REDUX: Cancel Edit on Post');
			return {
				...state,
				postToEdit: undefined
			}
		default:
			return state;
	}
}