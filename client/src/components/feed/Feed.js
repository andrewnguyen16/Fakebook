import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";

export default function Feed({ type, data }) {
  let posts = [];

  if (type === "Home") {
    const { allPost } = data;
    posts = allPost;
  } else if (type === "Profile") {
    const { myPost } = data;
    posts = myPost;
  } else if (type === "User") {
    const { findPostByUsername } = data;
    posts = findPostByUsername;
  } else if (type === "Friend") {
    const { myFriendsPosts } = data;
    posts = myFriendsPosts;
  }

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(type === "Profile" || type === "Home") && <Share />}
        {posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
