import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { GET_FRIEND } from "../../graphql/users";

const Friend = ({ people }) => {
  const history = useHistory();
  let friends = [];
  let redirectCheck = false;
  const { data } = useQuery(GET_FRIEND);

  if (people) {
    friends = people;
  } else {
    friends = data?.getFriends;
    redirectCheck = true;
  }
  const redirect = (name) => {
    if (redirectCheck) {
      return history.push({
        pathname: `user/${name}`,
      });
    }
    return history.push({
      pathname: name,
    });
  };

  return (
    <div className="rightbarFollowings">
      {friends &&
        friends.map((u) => (
          <div key={u.id} className="rightbarFollowing">
            <img onClick={() => redirect(u.username)} src={u.userpic} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">{u.username}</span>
          </div>
        ))}
    </div>
  );
};

export default Friend;
