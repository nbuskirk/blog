import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { Form } from '../../components/Post';


/* NO SETSTATE ANYWHERE IN HERE --REDUX STYLE */

class Home extends React.Component {

	componentDidMount() {
		const { onLoad } = this.props;
		axios('http://localhost:8080/api/posts')
			.then((res) => onLoad(res.data))
	}

	handleDelete(id) {
		const { onDelete } = this.props;
		return axios.delete(`http://localhost:8080/api/posts/${id}`)
			.then(() => onDelete(id))  //fire redux sync
	}

	handleEdit(post) {
		const { setEdit } = this.props;

		setEdit(post);
	}

	render() {
		const { posts } = this.props;

		return (
			<div id="blog">
			<div className="container">
				<div className=" mx-auto card p-5 text-center">
						<h1 className='card-title display-4'>Add Posts</h1>
							<p className='card-body'>Create a new post with the following details</p>
					<Form />
				</div>
				
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
                  <div className="card-footer">
                    <div className="row">
                    <button onClick={() => this.handleEdit(post)} className="btn btn-primary mx-3">
                        Edit
                    </button>
                    <button onClick={() => this.handleDelete(post._id)} className='btn btn-danger'>
                  		Delete
                  	</button>
                    </div>
                  </div>
                </div>
              )
            })}
            </div>
          </div>
        
			
		)
	}
}

const mapStateToProps = state => ({
	posts: state.blog.posts
})

const mapDispatchToProps = dispatch => ({
	onLoad: data => dispatch({ type: 'BLOG_LOADED', data }),
	onDelete: id => dispatch({ type: 'DELETE_POST', id}),
	setEdit: post => dispatch({ type: 'SET_POST', post})
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);