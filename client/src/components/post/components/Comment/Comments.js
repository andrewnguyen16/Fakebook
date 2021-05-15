import { TextField } from "@material-ui/core";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";

import Comment from "./Comment";
import { ALL_POST, COMMENT_POST, FRIEND_POST, MY_POST } from "../../../../graphql/posts";
import { LoadingSpinner } from "../../../../helper/Spinner";
import { notEmpty } from "../../../../alert";

const Comments = ({ data, Pid }) => {
  const [bodyCmt, setBodyCmt] = useState("");
  const [errMutation, setErrMutation] = useState(false);

  const [sendComment, { loading }] = useMutation(
    COMMENT_POST,
    {
      refetchQueries: [{ query: MY_POST }, { query: ALL_POST }, { query: FRIEND_POST }],
    },
    {
      onError: (err) => {
        setErrMutation(err.graphQLErrors[0].message);
      },
    }
  );

  const submitComment = (e) => {
    e.preventDefault();
    if (!bodyCmt.trim()) return notEmpty();
    sendComment({ variables: { postId: Pid, body: bodyCmt } });
    setBodyCmt("");
  };

  if (loading) return LoadingSpinner(loading);
  if (errMutation) return errMutation;

  return (
    <>
      <div className="postBottomComment">
        <TextField
          onChange={(e) => setBodyCmt(e.target.value)}
          autoComplete="off"
          className="postAddComment"
          id="standard-secondary"
          label="Add Comment"
          color="secondary"
          InputLabelProps={{
            style: { color: "rgb(43, 255, 0)", opacity: 0.6 },
          }}
          InputProps={{
            style: { color: "white" },
          }}
        />
        <Button
          onClick={(e) => submitComment(e)}
          endIcon={<SendIcon />}
          className="postSendComment"
          variant="contained"
          color="primary"
          href="#contained-buttons"
        >
          Send
        </Button>
      </div>
      {data.map((cmt) => (
        <Comment cmt={cmt} Pid={Pid} />
      ))}
    </>
  );
};

export default Comments;
