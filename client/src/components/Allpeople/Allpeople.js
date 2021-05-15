import { useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

import "./allpeople.css";
import { ALL_USER, GET_FRIEND, REQUEST_FRIEND } from "../../graphql/users";

export default function CloseFriend({ user, friends }) {
  const history = useHistory();
  // friends la list of friends
  // user is user show in the sidebar
  const myname = localStorage.getItem("username");
  const check = friends.find((x) => x.username === user.username);

  const [reqFriend] = useMutation(REQUEST_FRIEND, {
    refetchQueries: [{ query: GET_FRIEND }, { query: ALL_USER }],
  });

  const requestFriend = () => {
    reqFriend({ variables: { username: user.username } });
  };

  if (myname === user.username) return <></>;

  return (
    <>
      {check ? (
        <li className="sidebarFriend">
          <img onClick={() => history.push(`user/${user.username}`)} className="sidebarFriendImg" src={user.avatar} alt="" />
          <span className="sidebarFriendName">{user.username}</span>
          <Button onClick={requestFriend} variant="contained" className="sidebarAddFriendAdded" startIcon={<RemoveCircleOutlineIcon />}>
            Unfriend
          </Button>
        </li>
      ) : (
        <li className="sidebarFriend">
          <img onClick={() => history.push(`user/${user.username}`)} className="sidebarFriendImg" src={user.avatar} alt="" />
          <span className="sidebarFriendName">{user.username}</span>
          <Button onClick={requestFriend} variant="contained" className="sidebarAddFriendAdd" startIcon={<AddCircleOutlineIcon />}>
            Add friend
          </Button>
        </li>
      )}
    </>
  );
}
