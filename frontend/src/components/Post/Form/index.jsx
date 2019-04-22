import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Form extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      author: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.postToEdit) {
      //if we get handed a post prop to edit
      this.setState({
        title: nextProps.postToEdit.title,
        body: nextProps.postToEdit.body,
        author: nextProps.postToEdit.author
      })
    } else {
      this.setState({
        title: '',
        body: '',
        author: ''
      })
    }
  }
  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value
    })
  }
  handleCancel(postToEdit){
    const { onCancel } = this.props;
    onCancel(postToEdit)
  }
  handleSubmit() {
    const { onSubmit, postToEdit, onEdit } = this.props;
    const { title, body, author } = this.state; //spread
   
    if(!postToEdit) {
    return axios.post('http://localhost:8080/api/posts', {
      title,
      body,
      author
    })
    .then((res) => onSubmit(res.data))
    .then(() => this.setState({title:'', body: '', author: ''}));
  } else {
    return axios.patch(`http://localhost:8080/api/posts/${postToEdit._id}`, {
      title,
      body,
      author
    })
    .then((res) => onSubmit(res.data))
    .then(() => this.setState({title:'', body: '', author: ''}));
  }
  }

  render() {

    const { postToEdit } = this.props;
    const { title, body, author } = this.state;

    return (
      <div className="">
      <div class="col-lg-6 mx-auto">
        <input 
          onChange={(ev) => this.handleChangeField('title',ev)}
          value={title}
          className="form-control border-bottom-0 rounded-top p-4" placeholder="Article Title" name='title' />
        <textarea 
          onChange={(ev) => this.handleChangeField('body',ev)}
          value={body}
          rows={10}
          className="form-control border-bottom-0 p-4" placeholder="Article Description">
        </textarea>
        <input 
          onChange={(ev) => this.handleChangeField('author',ev)}
          value={author}
          className="form-control rounded-bottom p-4" placeholder="Article Author" />
          {postToEdit ? <button onClick={this.handleCancel} className="btn btn-secondary mx-2 float-right">Cancel</button> : ''}
          <button onClick={this.handleSubmit} className="btn btn-primary btn-lg btn-block mt-4">{postToEdit ? 'Update' : 'Go'}</button>
      </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({type: 'SUBMIT_POST', data}),
  onEdit: data => dispatch({ type: 'EDIT_POST', data}),
  onCancel: data => dispatch({ type: 'EDIT_CANCEL', data})
})

const mapStateToProps = state => ({
  postToEdit: state.blog.postToEdit,
})

export default connect(mapStateToProps, mapDispatchToProps)(Form);