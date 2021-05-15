import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ALL_POST, LIKE_POST, MY_POST } from "../../../../graphql/posts";
import LikeButton from "../../../../helper/picture/like.png";

const Like = ({ Pid }) => {
  const [errMutation, setErrMutation] = useState(false);

  const [likePost] = useMutation(
    LIKE_POST,
    {
      refetchQueries: [{ query: MY_POST }, { query: ALL_POST }],
    },
    {
      onError: (err) => {
        setErrMutation(err.graphQLErrors[0].message);
      },
    }
  );

  const submitLike = (e) => {
    e.preventDefault();
    likePost({ variables: { postId: Pid } });
  };

  if (errMutation) return errMutation;

  return (
    <>
      <img onClick={(e) => submitLike(e)} className="likeIcon" src={LikeButton} alt="" />
    </>
  );
};

export default Like;
