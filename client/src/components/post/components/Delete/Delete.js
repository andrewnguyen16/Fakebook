import { useMutation } from "@apollo/client";
import CloseIcon from "@material-ui/icons/Close";
import { ALL_POST, DELETE_POST, MY_POST } from "../../../../graphql/posts";
import { checkDelete } from "../../../../alert";

const Delete = ({ Pid }) => {
  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: MY_POST }, { query: ALL_POST }],
  });

  const submitDeletePost = async () => {
    const check = await checkDelete();
    if (!check) return;
    deletePost({ variables: { postId: Pid } });
  };

  return <CloseIcon className="postTopRightIcon" onClick={submitDeletePost} />;
};

export default Delete;
