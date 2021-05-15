import { useState } from "react";

import "./rightbar.css";
import Online from "../online/Online";
import { birthDay } from "../../alert";
import Firework from "../../Firework";
import Friend from "../online/Friend";
import BirthDay from "../../helper/picture/gift.png";
import Fakebook from "../../helper/picture/ad.jpg";

export default function Rightbar({ profile, people }) {
  let user = undefined;
  if (profile) {
    user = profile[0];
  } else if (people) {
    user = people;
  }

  // Fireword animation
  const [fireword, setFireword] = useState("");
  const birthDayShow = () => {
    birthDay();
    setFireword("OK");
    setTimeout(function () {
      setFireword("");
    }, 3000);
  };
  //End Firework animation

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={BirthDay} alt="" onClick={birthDayShow} />
          <span className="birthdayText">
            <b>Mark Zuckerberg</b> and <b>3 other friends</b> have a birhday today.
            {fireword && <Firework />}
          </span>
        </div>
        <img className="rightbarAd" src={Fakebook} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <Online />
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Hobbies:</span>
            <span className="rightbarInfoValue">{user.hobbies}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <Friend people={user.friends} />
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">{user ? <ProfileRightbar /> : <HomeRightbar />}</div>
    </div>
  );
}
