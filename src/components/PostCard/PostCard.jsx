import React from "react";
import { Link } from "react-router-dom";

function PostCard({ post, handleDeletePost }) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">{post.name}</h3>
      </div>
      <div className="panel-body">
        <dl>
          <dt>Title</dt>
          <dd>{post.title}</dd>
          <dt>Posts</dt>
          <dd>{post.posts}</dd>
        </dl>
      </div>
      <div className="panel-footer">
        <Link
          className="btn btn-xs btn-warning"
          to={{
            pathname: "/edit",
            state: { post }
          }}
        >
          EDIT
        </Link>
        <button
          className="btn btn-xs btn-danger margin-left-10"
          onClick={() => handleDeletePost(post._id)}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}

export default PostCard;
