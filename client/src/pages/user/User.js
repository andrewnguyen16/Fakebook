import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import "./user.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { userSelector } from "../../store/userSlice";
import { LoadingSpinnerPost } from "../../helper/Spinner";
import { USER_POST } from "../../graphql/posts";
import { ALL_USER, GET_FRIEND, GET_USER, REQUEST_FRIEND } from "../../graphql/users";
import WallPaper from "../../helper/picture/wallpaper.jpg";

export default function User() {
  const { name } = useParams();
  const history = useHistory();
  const user = useSelector(userSelector.selectAll);

  const {
    loading: loadingUser,
    error: errUser,
    data: people,
  } = useQuery(GET_USER, {
    variables: { name },
  });
  if (name === user[0].username) history.push("/profile");

  const [reqfriend] = useMutation(REQUEST_FRIEND, {
    refetchQueries: [{ query: GET_FRIEND }, { query: ALL_USER }, { query: GET_USER, variables: { name } }],
  });
  const { data: Allfriends } = useQuery(GET_FRIEND);
  const {
    loading: loadingPost,
    error: errPost,
    data,
  } = useQuery(USER_POST, {
    variables: { name },
  });

  if (loadingPost || loadingUser) return LoadingSpinnerPost();
  if (!people) history.push("/");
  if (errPost || errUser) return <h1>Error, please comeback later!!!</h1>;
  const check = Allfriends?.getFriends.find((x) => x.username === name);

  const sendFrienRequest = () => {
    reqfriend({ variables: { username: name } });
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src={WallPaper} alt="" />
              <img className="profileUserImg" src={people?.getUser.avatar} alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{people?.getUser.username}</h4>
              {check ? (
                <Button onClick={sendFrienRequest} variant="contained" className="profileFriendAdded" startIcon={<RemoveCircleOutlineIcon />}>
                  Unfriend
                </Button>
              ) : (
                <Button onClick={sendFrienRequest} variant="contained" className="profileFriendAdd" startIcon={<AddCircleOutlineIcon />}>
                  Add friend
                </Button>
              )}
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed type="User" data={data} />
            <Rightbar people={people?.getUser} />
          </div>
        </div>
      </div>
    </>
  );
}
