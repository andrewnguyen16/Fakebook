import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import axios from "axios";

import "./share.css";
import { userSelector } from "../../store/userSlice";
import { ALL_POST, CREATE_POST, FRIEND_POST, MY_POST } from "../../graphql/posts";
import { LoadingSpinnerPost } from "../../helper/Spinner";
import { notEmpty } from "../../alert";

export default function Share() {
  const history = useHistory();
  const user = useSelector(userSelector.selectAll);
  const [complete, setComplete] = useState(true);
  const [status, setStatus] = useState("");
  const [file, setFile] = useState("");
  const [imgReview, setImgReview] = useState("");

  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: MY_POST }, { query: ALL_POST }, { query: FRIEND_POST }],
  });

  const convertImgToSrcToReview = (fileImg) => {
    setFile(fileImg);
    const reader = new FileReader();
    reader.readAsDataURL(fileImg);
    reader.onloadend = () => {
      setImgReview(reader.result);
    };
  };

  const uploadImg = async () => {
    setComplete(false);
    if (!file) return "";
    const formImg = new FormData();
    formImg.append("upload_preset", "FakeBook-GraphQL");
    formImg.append("file", file);
    const imglink = await axios.post("https://api.cloudinary.com/v1_1/nozaki/image/upload", formImg, {});
    return imglink.data.secure_url;
  };

  const submitPost = async () => {
    if (!file && !status.trim()) return notEmpty();
    const imgSent = await uploadImg();
    createPost({ variables: { body: status, image: imgSent } });
    setStatus("");
    setFile("");
    setImgReview("");
    setComplete(true);
  };

  if (!complete) return LoadingSpinnerPost();

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img onClick={() => history.push("/profile")} className="shareProfileImg" src={user[0].avatar} alt="" />
          <input onChange={(e) => setStatus(e.target.value)} placeholder={`What's in your mind ${user[0].username}?`} className="shareInput" />
        </div>
        {imgReview && (
          <>
            <img className="shareImgReview" src={imgReview} alt="" /> <br />
            <button onClick={() => setImgReview("")} className="shareImgReviewRemove">
              Remove
            </button>
          </>
        )}
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption" onChange={(e) => convertImgToSrcToReview(e.target.files[0])}>
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input style={{ display: "none" }} type="file" id="file" accept=".png,.jpeg,.jpg" />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" onClick={submitPost}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
