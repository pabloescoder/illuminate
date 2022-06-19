import React, { useState, useEffect } from "react";
import NavSearchBar from "./NavSearchBar";
import SignUp from "../signup_login/SignUp";
import Login from "../signup_login/Login";
import Post from "../post/Post";
import PostMagnified from "../post/PostMagnified";
import NewPost from "../post/NewPost";
import axios from "axios";
import "./Homepage.css";

const Homepage = ({ isHappy, handleLogoClick }) => {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [isPostMagnified, setIsPostMagnified] = useState(false);
  const [magnifiedPostData, setMagnifiedPostData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [postsData, setPostsData] = useState(null);
  const [postsDataHappyElements, setPostsDataHappyElements] = useState(null);
  const [postsDataUnhappyElements, setPostsDataUnhappyElements] =
    useState(null);

  const handlePostClose = () => {
    setIsPostMagnified(false);
    setMagnifiedPostData(null);
  };

  const handlePostClick = (postData) => {
    setMagnifiedPostData(postData);
    setIsPostMagnified(true);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const config = {
      method: "get",
      url: "http://127.0.0.1:8000/userPosts/api/all-users-posts/",
      headers: {
        Accept: "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        setPostsData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (postsData) {
      setPostsDataHappyElements(
        postsData
          .filter((dataObj) => dataObj.is_happy)
          .map((dataObj) => {
            return (
              <Post
                key={dataObj.id}
                id={dataObj.id}
                user={"Placeholder"}
                date={dataObj.upload_date}
                image={dataObj.post_image}
                title={dataObj.post_title}
                description={dataObj.post_description}
                likes={dataObj.likes}
                handlePostClick={handlePostClick}
              />
            );
          })
      );

      setPostsDataUnhappyElements(
        postsData
          .filter((dataObj) => !dataObj.is_happy)
          .map((dataObj) => {
            return (
              <Post
                key={dataObj.id}
                id={dataObj.id}
                user={"Placeholder"}
                date={dataObj.upload_date}
                image={dataObj.post_image}
                title={dataObj.post_title}
                description={dataObj.post_description}
                likes={dataObj.likes}
                handlePostClick={() => handlePostClick(dataObj)}
              />
            );
          })
      );
    }
  }, [postsData]);

  return (
    <main className="homepage-section">
      <NavSearchBar
        handleLogoClick={handleLogoClick}
        handleSignUpClick={() => setOpenSignUp(true)}
        handleLoginClick={() => setOpenLogin(true)}
        isLoggedIn={isLoggedIn}
      ></NavSearchBar>
      {isPostMagnified && (
        <PostMagnified
          postData={magnifiedPostData}
          handlePostClose={handlePostClose}
        />
      )}
      {!isPostMagnified && isHappy && (
        <>
          <NewPost isHappy={isHappy} />
          <main>{postsDataHappyElements}</main>
        </>
      )}
      {!isPostMagnified && !isHappy && (
        <>
          <NewPost isHappy={isHappy} />
          <main>{postsDataUnhappyElements}</main>
        </>
      )}
      <SignUp
        open={openSignUp}
        handleOpen={() => setOpenSignUp(true)}
        handleClose={() => setOpenSignUp(false)}
      />
      <Login
        open={openLogin}
        handleOpen={() => setOpenLogin(true)}
        handleClose={() => setOpenLogin(false)}
        handleSignUpClick={() => {
          setOpenLogin(false);
          setOpenSignUp(true);
        }}
        handleLoginSuccess={handleLoginSuccess}
      />
    </main>
  );
};

export default Homepage;
