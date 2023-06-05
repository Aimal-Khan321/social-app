import React from 'react'
import './online.css';

const Online = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className='online'>
         <li className="rightBarFriend">
            <div className="rightBarProfileImgContainer">
              <img
                src={PF+user.profilePicture}
                alt=""
                className="rightBarProfileImg"
              />
              <span className="rightBarOnline"></span>
            </div>
            <span className="rightBarUsername">{user.username}</span>
          </li>
    </div>
  )
}

export default Online
