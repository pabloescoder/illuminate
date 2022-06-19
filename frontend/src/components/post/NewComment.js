import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import StyledTextField from "./StyledTextField";
import Typography from "@mui/material/Typography";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AuthContext from "../../context/AuthProvider";
import "./NewComment.css";

const NewComment = ({ id }) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const { auth } = useContext(AuthContext);
  const axios = useAxiosPrivate();
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [showCommentSuccessMsg, setShowCommentSuccessMsg] = useState(false);

  const [newCommentData, setNewCommentData] = useState({
    id: id,
    description: "",
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

  const submitNewComment = async (e) => {
    const newCommentDataObj = new FormData();
    newCommentDataObj.append("post_id", parseInt(newCommentData.id));
    console.log(newCommentData.id);
    newCommentDataObj.append("comment_text", newCommentData.description);
    try {
      // make axios post request
      await axios({
        method: "post",
        url: "http://127.0.0.1:8000/userPosts/api/create-comments/", // https://httpbin.org/post <- For Testing
        data: newCommentDataObj,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + auth.accessToken,
        },
      });
      setCommentSuccess(true);
      setNewCommentData({
        id: { id },
        description: "",
      });
      setIsCommenting(false);
      setShowCommentSuccessMsg(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (commentSuccess) {
      setTimeout(() => {
        setShowCommentSuccessMsg(false);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentSuccess]);

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
      {!isCommenting && showCommentSuccessMsg && (
        <Typography
          variant="body1"
          sx={{
            mt: 1,
            mb: 1,
            borderRadius: "5px",
            width: "100%",
            textAlign: "center",
            backgroundColor: "green",
            color: "white",
          }}
        >
          Your comment was submitted successfully!
        </Typography>
      )}
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
