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

	render() {
		const { posts } = this.props;

		return (
			<div className='container'>
				<div className='row pt-5'>
					<div className='col-12 col-lg-6 offset-lg-3'>
						<h1>Test Blog</h1>
					</div>
					<Form />
				</div>
				<div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
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
      </div>
			
		)
	}
}

const mapStateToProps = state => ({
	posts: state.home.posts
})

const mapDispatchToProps = dispatch => ({
	onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data }),
	onDelete: id => dispatch({ type: 'DELETE_POST', id})
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);