import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Avatar, TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import BackspaceIcon from "@material-ui/icons/Backspace";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { ALL_POST, EDIT_COMMENT_POST, DELETE_COMMENT_POST, MY_POST, FRIEND_POST } from "../../../../graphql/posts";
import { notEmpty } from "../../../../alert";
import { userSelector } from "../../../../store/userSlice";

const Comment = ({ cmt, Pid }) => {
  const history = useHistory();
  const user = useSelector(userSelector.selectAll);
  const [editting, setEditting] = useState(false);
  const [bodyEdit, setBodyEdit] = useState("");
  const [errMutation, setErrMutation] = useState(false);

  const [editComment] = useMutation(
    EDIT_COMMENT_POST,
    {
      refetchQueries: [{ query: MY_POST }, { query: ALL_POST }, { query: FRIEND_POST }],
    },
    {
      onError: (err) => {
        setErrMutation(err.graphQLErrors[0].message);
      },
    }
  );

  const [deleteComment] = useMutation(
    DELETE_COMMENT_POST,
    {
      refetchQueries: [{ query: MY_POST }, { query: ALL_POST }, { query: FRIEND_POST }],
    },
    {
      onError: (err) => {
        setErrMutation(err.graphQLErrors[0].message);
      },
    }
  );

  const submitEditedComment = (e) => {
    e.preventDefault();
    if (!bodyEdit.trim()) return notEmpty();
    editComment({ variables: { postId: Pid, commentId: cmt.id, body: bodyEdit } });
    setBodyEdit("");
    setEditting(false);
  };

  const submitDeleteComment = (e) => {
    e.preventDefault();
    deleteComment({ variables: { postId: Pid, commentId: cmt.id } });
  };

  if (errMutation) return errMutation;

  return (
    <div className="postAllComments">
      <Avatar onClick={() => history.push(`user/${cmt.username}`)} className="postAvatar" alt="User" src={cmt.userpic} />
      <div>
        <span className="postNameUserComment">{cmt.username}</span>
        <span className="postCommentAgo">{format(cmt.createdAt)}</span>
        <br />
        {editting ? (
          <div className="postChipContainer">
            <TextField
              className="postChipEditTxt"
              onChange={(e) => setBodyEdit(e.target.value)}
              size="small"
              autoFocus
              id="outlined-secondary"
              // variant="filled"
              // color="secondary"
            />
            <PlaylistAddCheckIcon className="postChipIcon" onClick={(e) => submitEditedComment(e)} />
            <EditIcon className="postChipIcon" onClick={() => setEditting(!editting)} />
          </div>
        ) : (
          <div className="postChipContainer">
            <p className="postChip">{cmt.body}</p>
            {user[0].username === cmt.username && (
              <>
                <EditIcon className="postChipIcon" onClick={() => setEditting(!editting)} />
                <BackspaceIcon onClick={(e) => submitDeleteComment(e)} className="postChipIcon" />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
