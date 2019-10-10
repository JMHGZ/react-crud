import React, { Component } from "react";
import "./App.css";
import { Route, NavLink } from "react-router-dom";
// The following imports all named exports attached to puppyAPI
import * as postAPI from "../../services/posts-api";
import PostListPage from "../../pages/PostListPage/PostListPage";
import AddPostPage from "../../pages/AddPostPage/AddPostPage";
import EditPostPage from "../../pages/EditPostPage/EditPostPage";

class App extends Component {
  state = {
    posts: []
  };

  handleAddPost = async newPostData => {
    const newPost = await postAPI.create(newPostData);
    this.setState(
      state => ({
        posts: [...state.posts, newPost]
      }),
      () => this.props.history.push("/")
    );
  };

  handleUpdatePost = async updatedPostData => {
    const updatedPost = await postAPI.update(updatedPostData);
    const newPostsArray = this.state.posts.map(p =>
      p._id === updatedPost._id ? updatedPost : p
    );
    this.setState(
      { posts: newPostsArray },
      // Using cb to wait for state to update before rerouting
      () => this.props.history.push("/")
    );
  };

  handleDeletePost = async id => {
    await postAPI.deleteOne(id);
    this.setState(
      state => ({
        // Yay, filter returns a NEW array
        posts: state.posts.filter(p => p._id !== id)
      }),
      () => this.props.history.push("/")
    );
  };

  async componentDidMount() {
    const posts = await postAPI.getAll();
    this.setState({ posts });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          QUIET-TIME CRUD
          <nav>
            <NavLink exact to="/">
              POST HISTORY
            </NavLink>
            &nbsp;&nbsp;&nbsp;
            <NavLink exact to="/add">
              ADD POST
            </NavLink>
          </nav>
        </header>
        <main>
          <Route
            exact
            path="/"
            render={({ history }) => (
              <PostListPage
                posts={this.state.posts}
                handleDeletePost={this.handleDeletePost}
              />
            )}
          />
          <Route
            exact
            path="/add"
            render={() => <AddPostPage handleAddPost={this.handleAddPost} />}
          />
          <Route
            exact
            path="/edit"
            render={({ history, location }) => (
              <EditPostPage
                handleUpdatePost={this.handleUpdatePost}
                location={location}
              />
            )}
          />
        </main>
      </div>
    );
  }
}

export default App;
