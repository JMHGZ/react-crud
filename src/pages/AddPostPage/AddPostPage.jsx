import React, { Component } from "react";

class AddPostPage extends Component {
  state = {
    invalidForm: true,
    formData: {
      title: String,
      posts: String
    }
  };

  formRef = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleAddPost(this.state.formData);
  };

  handleChange = e => {
    const formData = {
      ...this.state.formData,
      [e.target.name]: e.target.value
    };
    this.setState({
      formData,
      invalidForm: !this.formRef.current.checkValidity()
    });
  };

  render() {
    return (
      <>
        <h1>Add Entry</h1>
        <form
          ref={this.formRef}
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <div className="form-group">
            <label>Entry (required)</label>
            <input
              className="form-control"
              name="title"
              // .title .name!!
              value={this.state.formData.title}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Thoughts (required)</label>
            <input
              className="form-control"
              name="posts"
              //error may be here at .post
              value={this.state.formData.posts}
              onChange={this.handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn"
            disabled={this.state.invalidForm}
          >
            ADD ENTRY
          </button>
        </form>
      </>
    );
  }
}
export default AddPostPage;
