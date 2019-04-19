import React from 'react';
import axios from 'axios';
import qs from 'qs';

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
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value
    })
  }

  handleSubmit() {
    const { title, body, author } = this.state; //spread
    return axios.post('http://localhost:8080/api/posts', {
      title,
      body,
      author
    })
  }

  render() {

    const { title, body, author } = this.state;

    return (
      <div className="col-12 col-lg-6 offset-lg-3">
        <input 
          onChange={(ev) => this.handleChangeField('title',ev)}
          value={title}
          className="form-control my-3" placeholder="Article Title" name='title' />
        <textarea 
          onChange={(ev) => this.handleChangeField('body',ev)}
          value={body}
          className="form-control my-3" placeholder="Article Description">
        </textarea>
        <input 
          onChange={(ev) => this.handleChangeField('author',ev)}
          value={author}
          className="form-control my-3" placeholder="Article Author" />
        <button 
          onClick={this.handleSubmit}
          className="btn btn-primary float-right">Submit</button>
      </div>
    )
  }
}

export default Form;