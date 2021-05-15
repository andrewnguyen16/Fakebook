import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { GET_FRIEND } from "../../graphql/users";
import "./online.css";

export default function Online() {
  const history = useHistory();
  const { data } = useQuery(GET_FRIEND);
  const friends = data?.getFriends;

  return (
    <ul className="rightbarFriendList">
      {friends &&
        friends.map((friend) => (
          <li onClick={() => history.push(`user/${friend.username}`)} key={friend.id} className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img className="rightbarProfileImg" src={friend.userpic} alt="" />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{friend.username}</span>
          </li>
        ))}
    </ul>
  );
}
