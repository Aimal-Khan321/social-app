import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import {Link} from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
// import { Users } from "../../dummyData";

const Post = ({ post }) => {
 let dtFormat = new Intl.DateTimeFormat('en-US', {
    day:'2-digit',
    month:'short',
    year:'numeric'
  })
  const date = new Date(post.createdAt)
 
  const [like, setLike] = useState(post.likes.length);
  const [isLike, setIsLike] = useState(false);
  const [user, setUser] =  useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user:currentUser} = useContext(AuthContext);

  useEffect(()=>{
   setIsLike(post.likes.includes(currentUser._id));
  },[currentUser._id,post.likes])

  useEffect(()=>{
    const fetchUser = async()=>{
      const res= await axios.get(`/users?userId=${post?.userId}`)
      setUser(res.data);
    };
    fetchUser();
  },[post.userId])


  const likeHandler = () => {
    try {
      axios.put("/post/"+post._id+"/like",{userId:currentUser._id});
    } catch (error) {
      
    }
    setLike(isLike ? like - 1 : like + 1);
    setIsLike(!isLike)
  };

  // console.log("post====>",post);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
            <img
              src={user.profilePicture? PF+user.profilePicture : PF+"person/noAvatar.png"}
              alt=""
              className="postProfileImg"
            />
            </Link>
            <span className="postUsername">
              {user?.username}
            </span>
            <span className="postDate">{dtFormat.format(date)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PF}like.png`}
              alt=""
              onClick={likeHandler}
              className="likeIcon"
            />
            <img
              src={`${PF}heart.png`}
              alt=""
              onClick={likeHandler}
              className="likeIcon"
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
