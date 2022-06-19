import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import StyledTextField from "./StyledTextField";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AuthContext from "../../context/AuthProvider";
import "./NewPost.css";

const NewPost = ({ isHappy }) => {
  const [isPosting, setIsPosting] = useState(false);
  const { auth } = useContext(AuthContext);
  const axios = useAxiosPrivate();
  const [postSuccess, setPostSuccess] = useState(false);
  const [showPostSuccessMsg, setShowPostSuccessMsg] = useState(false);

  const [newPostData, setNewPostData] = useState({
    post_title: "",
    is_happy: isHappy,
    post_description: "",
    post_image: "",
  });

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

  const clearFileInput = () => {
    const fileInput = document.querySelector("input[type = 'file']");
    fileInput.value = null;
  };

  const submitNewPost = async (e) => {
    const newPostDataObj = new FormData();
    newPostDataObj.append("post_title", newPostData.post_title);
    newPostDataObj.append("post_description", newPostData.post_description);
    if (newPostDataObj.post_image !== "") {
      newPostDataObj.append("post_image", newPostData.post_image);
    }
    newPostDataObj.append("is_happy", newPostData.is_happy);
    try {
      // make axios post request
      await axios({
        method: "post",
        url: "http://127.0.0.1:8000/userPosts/api/create-post/", // https://httpbin.org/post <- For Testing
        data: newPostDataObj,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + auth.accessToken,
        },
      });
      setPostSuccess(true);
      setNewPostData({
        post_title: "",
        is_happy: { isHappy },
        post_description: "",
        post_image: "",
      });
      clearFileInput();
      setIsPosting(false);
      setShowPostSuccessMsg(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (postSuccess) {
      setTimeout(() => {
        setShowPostSuccessMsg(false);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postSuccess]);

  return (
    <div className="new-post">
      <Box sx={{ paddingTop: "2rem", width: "75%", textAlign: "center" }}>
        <Button
          variant="outlined"
          size="large"
          sx={{
            color: "white",
            borderColor: "white",
          }}
          onClick={handleNewPostClick}
        >
          Create a new post
        </Button>
      </Box>
      {!isPosting && showPostSuccessMsg && (
        <Typography
          variant="body1"
          component="h2"
          sx={{
            mt: 2,
            ml: 4,
            borderRadius: "5px",
            width: "70%",
            textAlign: "center",
            backgroundColor: "green",
            color: "white",
          }}
        >
          Your post was submitted successfully!
        </Typography>
      )}
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
            name="post_title"
            label="Post Title"
            value={newPostData.post_title}
            onChange={handleChange}
          />
          <StyledTextField
            sx={{ mt: 2, width: "100%", mb: 2 }}
            required
            multiline
            maxRows={10}
            name="post_description"
            label="Post Description"
            value={newPostData.post_description}
            onChange={handleChange}
          />
          <label htmlFor="new-post-image">
            Upload an image (Optional)
            <input
              accept="image/*"
              id="new-post-image"
              type="file"
              onChange={handleChange}
              name="post_image"
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
