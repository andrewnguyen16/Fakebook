import { useQuery } from "@apollo/client";

import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Wallpaper from "../../helper/picture/wallpaper.jpg";
import { MY_POST } from "../../graphql/posts.js";
import { LoadingSpinner } from "../../helper/Spinner";
import { userSelector } from "../../store/userSlice";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector(userSelector.selectAll);

  const { loading, error, data } = useQuery(MY_POST);
  if (loading) return LoadingSpinner(loading);
  if (error) return <h1>Error, please comeback later!!!</h1>;

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src={Wallpaper} alt="" />
              <img className="profileUserImg" src={user[0].avatar} alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user[0].username}</h4>
              <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed type="Profile" data={data} />
            <Rightbar profile={user} />
          </div>
        </div>
      </div>
    </>
  );
}
