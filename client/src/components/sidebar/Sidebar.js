import { RssFeed, Chat, PlayCircleFilledOutlined, Group, Bookmark, HelpOutline, WorkOutline, Event, School } from "@material-ui/icons";
import { Chip } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import DoneIcon from "@material-ui/icons/Done";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

import "./sidebar.css";
import Allpeople from "../Allpeople/Allpeople";
import { showMore } from "../../alert";

export default function Sidebar({ all_users, all_friends, type }) {
  let people = undefined;
  let friends = undefined;
  if (type === "show") {
    people = all_users;
    friends = all_friends;
  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton" onClick={showMore}>
          Show More
        </button>
        <hr className="sidebarHr" />
        {people && friends && (
          <Chip
            className="sidebarChip"
            avatar={
              <Avatar>
                <GroupAddIcon />
              </Avatar>
            }
            label="All People"
            clickable
            color="primary"
            deleteIcon={<DoneIcon />}
          />
        )}

        <ul className="sidebarFriendList">{people && friends && people.map((u) => <Allpeople friends={friends} key={u.id} user={u} />)}</ul>
      </div>
    </div>
  );
}
