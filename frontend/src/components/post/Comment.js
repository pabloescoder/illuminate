import React from "react";
import { Link } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import { red } from "@mui/material/colors";

import "./Comment.css";

// user , desc, likes

const Comment = ({ user, desc, likes }) => {
  return (
    <div className="comment">
      <div className="user-info">
        Commented by{" "}
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
      </div>
      <p className="comment-body">This is a comment</p>
      <p className="comment-likes">
        <IconButton aria-label="likes" sx={{ paddingLeft: 0 }}>
          <FavoriteBorderIcon fontSize="small" sx={{ color: red[500] }} />
        </IconButton>
        <span className="bold">{likes}</span>
        <span>Likes</span>
      </p>
    </div>
  );
};

export default Comment;
