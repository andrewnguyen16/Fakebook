import { useState } from "react";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import axios from "axios";
import { useMutation } from "@apollo/client";

import "./editPost.css";
import { ALL_POST, EDIT_POST, MY_POST } from "../../../../graphql/posts";
import { LoadingSpinnerPost } from "../../../../helper/Spinner";
import { notEmpty } from "../../../../alert";

export default function EditPost({ post, setShowEditPost }) {
  const [complete, setComplete] = useState(true);
  const [status, setStatus] = useState(post.body);
  const [imgReview, setImgReview] = useState(post.image);
  const [file, setFile] = useState("");

  // check if imgReview is changed, if false then use previous img url
  const [check, setCheck] = useState(false);

  const [editPost] = useMutation(EDIT_POST, {
    refetchQueries: [{ query: MY_POST }, { query: ALL_POST }],
  });

  const convertImgToSrcToReview1 = (fileImg) => {
    setCheck(true);
    setFile(fileImg);
    const reader1 = new FileReader();
    reader1.readAsDataURL(fileImg);
    reader1.onloadend = () => {
      setImgReview(reader1.result);
    };
  };

  const editUploadImg = async () => {
    // if imgReview is changed, then we use previous img url
    if (!check) return post.image;

    setComplete(false);
    if (!file) return "";

    const formImg = new FormData();
    formImg.append("upload_preset", "FakeBook-GraphQL");
    formImg.append("file", file);

    const imglink = await axios.post("https://api.cloudinary.com/v1_1/nozaki/image/upload", formImg, {});
    return imglink.data.secure_url;
  };

  const submitEditPost = async () => {
    if (!file && !status.trim()) return notEmpty();
    const imgSent = await editUploadImg();
    editPost({ variables: { postId: post.id, body: status, image: imgSent } });
    setStatus("");
    setFile("");
    setImgReview("");
    setComplete(true);
    setShowEditPost(false);
  };

  if (!complete) return LoadingSpinnerPost();

  return (
    <div className="share">
      <div className="shareWrapper1">
        <div className="share1Top">
          <input value={status} onChange={(e) => setStatus(e.target.value)} className="shareInput1" />
        </div>
        {imgReview && (
          <>
            <img className="shareImgReview" src={imgReview} alt="" /> <br />
            <button
              onClick={() => {
                setImgReview("");
                setCheck(true);
              }}
              className="shareImgReviewRemove"
            >
              Remove
            </button>
          </>
        )}
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <label htmlFor="file1" className="shareOption" onChange={(e) => convertImgToSrcToReview1(e.target.files[0])}>
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input style={{ display: "none" }} type="file" id="file1" accept=".png,.jpeg,.jpg" />
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
          <button className="shareButton" onClick={submitEditPost}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
