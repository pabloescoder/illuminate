import React from "react";
import "./Post.css";
import { Link } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import { IconButton } from "@mui/material";
import { red, common } from "@mui/material/colors";
import testImg from "../../testing-images/man-with-car.jpg";

// Fields: id, title, isHappy(boolean), image(optional), description, likes, comments[], date, user
const Post = ({
  id,
  user,
  date,
  title,
  isHappy,
  image,
  description,
  likes,
  comments,
}) => {
  return (
    <section className="post-section">
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
      </div>
      <div className="post-title">{title}</div>
      {image && (
        <div className="post-image">
          <img src={testImg} alt="Testing" />
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
    </section>
  );
};

export default Post;
