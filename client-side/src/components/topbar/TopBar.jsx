import React, { useContext } from "react";
import "./topBar.css";
import { Chat, Notifications, Search, Person } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/context/AuthContext";

const TopBar = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topBarContainer">
      <div className="topBarLeft">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <div className="logo">Social App</div>
        </Link>
      </div>
      <div className="topBarCenter">
        <div className="searchBar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friends, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topBarRight">
        <div className="topBarLinks">
          <span className="topBarLink">Homepage</span>
          <span className="topBarLink">Timeline</span>
        </div>
        <div className="topBarIcons">
          <div className="topBarIconsItem">
            <Person />
            <span className="topBarIconBadge">1</span>
          </div>
          <div className="topBarIconsItem">
            <Chat />
            <span className="topBarIconBadge">2</span>
          </div>
          <div className="topBarIconsItem">
            <Notifications />
            <span className="topBarIconBadge">3</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
        <img
          src={
            user.profilePicture
              ? PF + user.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt=""
          className="topBarImg"
        />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
