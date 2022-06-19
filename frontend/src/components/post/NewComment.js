import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import StyledTextField from "./StyledTextField";
import Typography from "@mui/material/Typography";
import "./NewComment.css";

const NewComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [newCommentData, setNewCommentData] = useState({
    user: "",
    description: "",
    likes: 0,
  });

  const handleNewCommentClick = () => {
    setIsCommenting((prevValue) => !prevValue);
  };

  const handleChange = (event) => {
    setNewCommentData((prevValue) => {
      return {
        ...prevValue,
        [event.target.name]: event.target.value,
      };
    });
  };

  const submitNewComment = () => {
    console.log(newCommentData);
    setNewCommentData({
      user: "",
      description: "",
      likes: 0,
    });
    setIsCommenting(false);
  };

  return (
    <div className="new-comment">
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="outlined"
          size="large"
          sx={{
            mb: 2,
            color: "white",
            borderColor: "white",
          }}
          onClick={handleNewCommentClick}
        >
          Create a new comment
        </Button>
      </Box>
      {isCommenting && (
        <div className="collapsable">
          <Typography
            variant="h4"
            component="h2"
            sx={{ margin: 0, textAlign: "center" }}
          >
            New Comment
          </Typography>
          <StyledTextField
            sx={{ mt: 2, width: "100%", mb: 2 }}
            required
            multiline
            maxRows={6}
            name="description"
            label="Your Comment Here"
            value={newCommentData.description}
            onChange={handleChange}
          />
          <Box textAlign="center">
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 2, backgroundColor: "#00a86b" }}
              onClick={submitNewComment}
            >
              Submit Comment
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
};

export default NewComment;
