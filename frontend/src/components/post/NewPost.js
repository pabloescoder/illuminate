import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import "./NewPost.css";
import StyledTextField from "./StyledTextField";

const NewPost = ({ isHappy }) => {
  const [isPosting, setIsPosting] = useState(false);
  const [date, setDate] = useState("");
  const [newPostData, setNewPostData] = useState({
    title: "",
    date: date,
    user: "",
    isHappy: isHappy,
    description: "",
    image: "",
    likes: 0,
    comments: [],
  });

  useEffect(() => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    setDate(dd + "/" + mm + "/" + yyyy);
  }, []);

  useEffect(() => {
    setNewPostData((prevValue) => {
      return {
        ...prevValue,
        date: date,
      };
    });
  }, [date]);

  const handleNewPostClick = () => {
    setIsPosting((prevValue) => !prevValue);
  };

  const handleChange = (event) => {
    setNewPostData((prevValue) => {
      return {
        ...prevValue,
        [event.target.name]:
          event.target.type === "file"
            ? event.target.files[0]
            : event.target.value,
      };
    });
  };

  const submitNewPost = () => {
    console.log(newPostData);
    setNewPostData({
      title: "",
      date: date,
      user: "",
      isHappy: { isHappy },
      description: "",
      image: "",
      likes: 0,
      comments: [],
    });
    setIsPosting(false);
  };

  // Fields: id, title, isHappy(boolean), image(optional), description, likes, comments[], date, user

  return (
    <div className="new-post">
      <Box sx={{ paddingTop: "2rem" }}>
        <Button
          variant="outlined"
          size="large"
          sx={{
            mr: 2,
            ml: "30%",
            color: "white",
            borderColor: "white",
          }}
          onClick={handleNewPostClick}
        >
          Create a new post
        </Button>
      </Box>
      {isPosting && (
        <div className="collapsable">
          <Typography
            variant="h4"
            component="h2"
            sx={{ margin: 0, textAlign: "center" }}
          >
            New Post
          </Typography>
          <StyledTextField
            sx={{ mt: 2, width: "100%" }}
            required
            name="title"
            label="Post Title"
            value={newPostData.title}
            onChange={handleChange}
          />
          <StyledTextField
            sx={{ mt: 2, width: "100%", mb: 2 }}
            required
            multiline
            maxRows={10}
            name="description"
            label="Post Description"
            value={newPostData.description}
            onChange={handleChange}
          />
          <label htmlFor="new-post-image">
            Upload an image (Optional)
            <input
              accept="image/*"
              id="new-post-image"
              type="file"
              onChange={handleChange}
              name="image"
              style={{ marginLeft: "1rem" }}
            />
          </label>
          <Box textAlign="center">
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 2, backgroundColor: "#00a86b" }}
              onClick={submitNewPost}
            >
              Submit Post
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
};

export default NewPost;
