import React, { useState } from "react";
import NavSearchBar from "./NavSearchBar";
import SignUp from "../signup_login/SignUp";
import Login from "../signup_login/Login";
import Post from "../post/Post";
import PostMagnified from "../post/PostMagnified";
import NewPost from "../post/NewPost";
import "./Homepage.css";

//---------------TESTING!---------------

// TESTING IMAGES
import brokenWatch from "../../testing-images/broken-watch.jpg";
import manWithCar from "../../testing-images/man-with-car.jpg";

// Fields: id, title, isHappy(boolean), image(optional), description, likes, comments[], date, user
const tempPostData = [
  {
    id: 1,
    user: "postUser1",
    date: "02-11-2021",
    title: "I just broke my watch given by my grandmother",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    likes: 100,
    isHappy: false,
    image: { brokenWatch },
    comments: [
      {
        user: "comUser1",
        desc: "This is comUser1's comment",
        likes: 13,
      },
      {
        user: "comUser2",
        desc: "This is comUser2's comment",
        likes: 20,
      },
      {
        user: "comUser3",
        desc: "This is comUser3's comment",
        likes: 15,
      },
    ],
  },
  {
    id: 2,
    user: "postUser2",
    date: "02-11-2021",
    title: "I bought a new car with my salary!",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    likes: 1000,
    isHappy: true,
    image: { manWithCar },
    comments: [
      {
        user: "comUser1",
        desc: "This is comUser1's second comment",
        likes: 27,
      },
      {
        user: "comUser2",
        desc: "This is comUser2's second comment",
        likes: 20,
      },
      {
        user: "comUser3",
        desc: "This is comUser3's second comment",
        likes: 15,
      },
    ],
  },
  {
    id: 3,
    user: "postUser3",
    date: "02-11-2021",
    title: "I have an exam coming up in 3 days and I haven't studied at all",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    likes: 305,
    isHappy: false,
    comments: [
      {
        user: "comUser1",
        desc: "This is comUser1's third comment",
        likes: 13,
      },
      {
        user: "comUser2",
        desc: "This is comUser2's third comment",
        likes: 23,
      },
      {
        user: "comUser3",
        desc: "This is comUser3's third comment",
        likes: 51,
      },
    ],
  },
];

//---------------END TESTING!---------------

const Homepage = ({ isHappy, handleLogoClick }) => {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [isPostMagnified, setIsPostMagnified] = useState(false);
  const [magnifiedPostData, setMagnifiedPostData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

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

  //---------------TESTING---------------
  const tempPostDataHappyElements = tempPostData
    .filter((dataObj) => dataObj.isHappy)
    .map((dataObj) => {
      return (
        <Post
          key={dataObj.id}
          id={dataObj.id}
          user={dataObj.user}
          date={dataObj.date}
          title={dataObj.title}
          description={dataObj.description}
          likes={dataObj.likes}
          comments={dataObj.comments}
          handlePostClick={() => handlePostClick(dataObj)}
        />
      );
    });

  const tempPostDataUnhappyElements = tempPostData
    .filter((dataObj) => !dataObj.isHappy)
    .map((dataObj) => {
      return (
        <Post
          key={dataObj.id}
          id={dataObj.id}
          user={dataObj.user}
          date={dataObj.date}
          title={dataObj.title}
          description={dataObj.description}
          likes={dataObj.likes}
          comments={dataObj.comments}
          handlePostClick={() => handlePostClick(dataObj)}
        />
      );
    });
  //---------------END TESTING!---------------

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
          <main>{tempPostDataHappyElements}</main>
        </>
      )}
      {!isPostMagnified && !isHappy && (
        <>
          <NewPost isHappy={isHappy} />
          <main>{tempPostDataUnhappyElements}</main>
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
