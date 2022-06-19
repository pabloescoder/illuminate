import React from "react";
import { Link } from "@mui/material";
import Comment from "./Comment";
import NewComment from "./NewComment";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";
import { red, common } from "@mui/material/colors";

import "./Post.css";
import "./PostMagnified.css";

const PostMagnified = (props) => {
  const { user, date, title, image, description, likes, comments } =
    props.postData;

  const commentElements = comments.map((commentObj) => {
    return (
      <Comment
        key={commentObj.user + commentObj.desc}
        user={commentObj.user}
        desc={commentObj.desc}
        likes={commentObj.likes}
      />
    );
  });

  return (
    <>
      <section className="post-magnified-section">
        <div className="post-user-details">
          <p>
            Posted by{" "}
            <Link
              component="button"
              variant="body1"
              underline="hover"
              onClick={() => {
                console.info("I'm a button.");
              }}
              sx={{ color: "#fff" }}
            >
              {user}
            </Link>
          </p>
          <p>
            On <span className="bold">{date}</span>
          </p>
          <IconButton
            aria-label="close post"
            size="small"
            className="close-post-button"
            onClick={props.handlePostClose}
            sx={{ margin: 0, marginLeft: "auto" }}
          >
            <CancelIcon fontSize="large" sx={{ color: red[500] }} />
          </IconButton>
        </div>
        <div className="post-title">{title}</div>
        {image && (
          <div className="post-image">
            <img src={image} alt="Testing" />
          </div>
        )}
        <div className="post-body">{description}</div>
        <div className="post-metadata">
          <p>
            <IconButton aria-label="likes">
              <FavoriteBorderIcon sx={{ color: red[500] }} />
            </IconButton>
            <span className="bold">{likes}</span>
            <span>Likes</span>
          </p>
          <p>
            <IconButton aria-label="comments">
              <CommentIcon sx={{ color: common.white }} />
            </IconButton>
            <Link
              component="button"
              variant="body1"
              underline="hover"
              onClick={() => {
                console.info("I'm a button.");
              }}
              sx={{ color: "#fff" }}
            >
              <span className="bold">{comments.length}</span>
              <span>Comments</span>
            </Link>
          </p>
        </div>
        <h2>Comments</h2>
        <NewComment />
        <section className="post-magnified-comments">{commentElements}</section>
      </section>
    </>
  );
};

export default PostMagnified;
