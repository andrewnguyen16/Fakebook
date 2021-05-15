import "./post.css";
import EditIcon from "@material-ui/icons/Edit";
import { useState } from "react";
import { format } from "timeago.js";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Comments from "./components/Comment/Comments";
import EditPost from "./components/Editpost/EditPost";
import Like from "./components/Like/Like";
import Delete from "./components/Delete/Delete";
import { userSelector } from "../../store/userSlice";

export default function Post({ post }) {
  const history = useHistory();
  const user = useSelector(userSelector.selectAll);
  const [showComment, setShowComment] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img onClick={() => history.push(`/user/${post.username}`)} className="postProfileImg" src={post.userpic} alt="People" />
            <span className="postUsername">{post.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            {user[0].username === post.username && (
              <>
                <EditIcon className="postTopRightIcon" onClick={() => setShowEditPost(!showEditPost)} />
                <Delete Pid={post.id} />
              </>
            )}
          </div>
        </div>
        {!showEditPost ? (
          <>
            <div className="postCenter">
              <div className="postText">{post.body}</div>
              <img className="postImg" src={post.image} alt="" />
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                <Like Pid={post.id} />
                <span className="postLikeCounter">{post.likesCount} people like it</span>
              </div>
              <div className="postBottomRight">
                <span onClick={() => setShowComment(!showComment)} className="postCommentText">
                  {post.commentsCount} comments
                </span>
              </div>
            </div>
            {showComment && <Comments Pid={post.id} data={post.comments} />}
          </>
        ) : (
          <EditPost post={post} setShowEditPost={setShowEditPost} />
        )}
      </div>
    </div>
  );
}
