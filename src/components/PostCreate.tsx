import "../styles/components/postCreate.scss";
import { FC, useState, KeyboardEvent } from "react";

interface PostCreateProps {
  createNewPost: (arg: string) => void;
  setIsError: (arg: string) => void;
}

const PostCreate: FC<PostCreateProps> = ({ createNewPost, setIsError }) => {
  const [postBody, setPostBody] = useState("");

  const createPost = () => {
    setIsError("");
    if (postBody.length > 1) {
      createNewPost(postBody);
      setPostBody("");
    } else {
      setIsError("The post is too short");
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") createPost();
  };

  return (
    <div className="create-post__card">
      <input
        onKeyDown={(e) => handleKey(e)}
        onChange={(e) => setPostBody(e.target.value)}
        value={postBody}
        className="create-post__card-input"
        type="text"
        placeholder="Whats new?"
      />
      <button
        disabled={postBody.length < 1}
        className="create-post__card-button small-btn"
        onClick={() => createPost()}
      >
        Publish
      </button>
    </div>
  );
};

export default PostCreate;
