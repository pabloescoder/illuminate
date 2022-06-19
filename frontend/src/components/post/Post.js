import React, { useState, useEffect } from "react";
import { Link } from "@mui/material";
import axios from "axios";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import { IconButton } from "@mui/material";
import { red, common } from "@mui/material/colors";

import "./Post.css";

const Post = ({
  id,
  user,
  date,
  title,
  isHappy,
  image,
  description,
  likes,
  handlePostClick,
}) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const config = {
      method: "get",
      url: `http://127.0.0.1:8000/userPosts/api/read-comments/${id}/`,
      headers: {
        Accept: "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        setComments(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className="post-section"
      onClick={() =>
        handlePostClick({
          id,
          user,
          date,
          title,
          image,
          description,
          likes,
          comments,
        })
      }
    >
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
          <img src={image} alt="Post graphic" />
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
