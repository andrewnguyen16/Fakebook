import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PeopleIcon from "@material-ui/icons/People";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";
import { useDispatch, useSelector } from "react-redux";

import "./topbar.css";
import { notSupport } from "../../alert";
import { removeUser, userSelector } from "../../store/userSlice";

export default function Topbar() {
  const user = useSelector(userSelector.selectAll);
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    dispatch(removeUser());
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span onClick={() => history.push("/")} className="logo">
          Fakebook
        </span>
      </div>
      <div className="topbarCenter">
        <a
          className="topbarGithub"
          rel="noopener noreferrer"
          href="https://github.com/"
          target="_blank"
        >
          <GitHubIcon className="topbarGithubIcon" />
        </a>
        <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Search for friend, post or video" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">
            <Button onClick={() => history.push("/friends")} className="topbarButton" variant="outlined" startIcon={<PeopleIcon />}>
              Friends Timeline
            </Button>
          </span>
        </div>
        <div className="topbarIcons">
          <div onClick={notSupport} className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">6</span>
          </div>
          <div onClick={notSupport} className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">8</span>
          </div>
          <div onClick={notSupport} className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">9</span>
          </div>
        </div>
        <div className="topbarProfile">
          <img src={user[0].avatar} alt="" className="topbarImg" />
          <div className="topbarProfileDropdown">
            <Button
              onClick={() => history.push("/profile")}
              className="topbarProfileButton"
              startIcon={<AccountCircleIcon />}
              variant="contained"
              fullWidth
            >
              Profile
            </Button>
            <Button onClick={logout} startIcon={<ExitToAppIcon />} variant="contained" color="secondary" fullWidth>
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
