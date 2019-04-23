import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { Form } from '../../components/Post';

class Blog extends React.Component {

	componentDidMount() {
		/* When the <Blog /> is mounted, fetch our data and send it to the reducer (blog.onLoad) */
		/* This will change the state of blog to have a posts json array */
		const { onLoad } = this.props;
		axios('http://mishinima.com:8080/api/posts')
			.then((res) => onLoad(res.data))
	}

	handleDelete(id) {
		/* Call DELETE on the endpoint, then concat the users array in the reducer(blog.onDelete), and return it to us */
		/* This triggers a re-render with a shorter post list, post array - 1 */
		const { onDelete } = this.props;
		return axios.delete(`http://mishinima.com:8080/api/posts/${id}`)
			.then(() => onDelete(id))  
	}

	handleEdit(post) {
		/* Call the reducer (blog.setEdit) setting a setEdit property for that Post */
		/* This is used by the blog form. If you click edit on a post, it will cause a re-render, showing that post 
		in the add new post window */
		const { setEdit } = this.props;
		setEdit(post);
	}

	render() {
		const { posts, user } = this.props;

		return (
			<div id="blog">
				
				<div className="container">
					
					<div className=" mx-auto card p-5 text-center">
						<h1 className='card-title display-4'>Blog</h1>
						<p className='card-body'>Read all the latest posts, login to post and delete</p>
					</div>
					
					{user ? 
						<div className=" mx-auto card p-5 my-3 text-center">
							<h1 className='card-title display-4'>Add Posts</h1>
							<p className='card-body'>Create a new post with the following details</p>
							<Form />
						</div>
					: null }
				
					{posts.map((post) => {
						return (
							<div className="card my-3" key={post._id}>
								<div className="card-header">
									{post.title}
								</div>
								<div className="card-body">
									{post.body}
									<p className="mt-5 text-muted"><b>{post.author}</b> {moment(new Date(post.createdAt)).fromNow()}</p>
								</div>
								
								{user ? 
									<div className="card-footer">
										<div className="row">
											<button onClick={() => this.handleEdit(post)} className="btn btn-primary mx-3">Edit</button>
											<button onClick={() => this.handleDelete(post._id)} className='btn btn-danger'>Delete</button>
										</div>
									</div>
								: null}
                			</div>
              			)
            		})}
            	</div>
          	</div>
		)
	}
}

const mapStateToProps = state => ({
	posts: state.blog.posts,
	user: state.app.user
})

const mapDispatchToProps = dispatch => ({
	onLoad: data => dispatch({ type: 'BLOG_LOADED', data }),
	onDelete: id => dispatch({ type: 'DELETE_POST', id}),
	setEdit: post => dispatch({ type: 'SET_POST', post})
})

export default connect(mapStateToProps, mapDispatchToProps)(Blog);