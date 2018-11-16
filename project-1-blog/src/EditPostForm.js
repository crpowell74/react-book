import React, { Component } from "react";
import Quill from "react-quill";

class EditPostForm extends Component {
  state = {
    id: "",
    title: "",
    content: "",
    updated: false,
    isQuillLoaded: false
  };
  componentDidMount(prevProps, prevState) {
    console.log(this.props);
    this.setState({
      id: this.props.post.id,
      title: this.props.post.title,
      content: this.props.post.content,
      isQuillLoaded: true
    });
  }
  handleUpdatePost = e => {
    e.preventDefault();
    this.props.updatePost({
      id: this.state.id,
      title: this.state.title,
      content: this.state.content
    });
    this.setState({ updated: true });
    setTimeout(() => {
      this.setState({ updated: false });
    }, 1600);
  };
  render() {
    return (
      <form onSubmit={this.handleUpdatePost}>
        <h1>Edit Post</h1>
        {this.state.updated && (
          <p style={{ color: "green" }}>
            <strong>Post updated!</strong>
          </p>
        )}
        <p>
          <label htmlFor="form-title">Title:</label>
          <br />
          <input
            id="form-title"
            value={this.state.title}
            onChange={e => {
              this.setState({ title: e.target.value });
            }}
          />
        </p>
        <p>
          <label htmlFor="form-content">Content:</label>
        </p>
        {this.state.isQuillLoaded && (
          <Quill
            defaultValue={this.state.content}
            onChange={(content, delta, source, editor) => {
              console.log(editor.getContents());
              this.setState({ content: editor.getContents() });
            }}
          />
        )}
        <p>
          <button type="submit">Save</button>
        </p>
      </form>
    );
  }
}
export default EditPostForm;
