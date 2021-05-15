import { useQuery } from "@apollo/client";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { FRIEND_POST } from "../../graphql/posts.js";
import { LoadingSpinner } from "../../helper/Spinner";
import { ALL_USER, GET_FRIEND } from "../../graphql/users";
import "./friend.css";

export default function Friend() {
  const { loading, error, data } = useQuery(FRIEND_POST);
  const { data: Allusers } = useQuery(ALL_USER);
  const { data: Allfriends } = useQuery(GET_FRIEND);

  if (loading) return LoadingSpinner(loading);
  if (error) return <h1>Error, please comeback later!!!</h1>;

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        {Allusers && Allfriends ? <Sidebar type="show" all_users={Allusers.getAllUsers} all_friends={Allfriends.getFriends} /> : <Sidebar />}
        <Feed data={data} type="Friend" />
        <Rightbar />
      </div>
    </>
  );
}
