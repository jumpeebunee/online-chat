import "../styles/components/postList.scss";
import { FC } from "react";
import { IPost } from "../types/types";
import PostItem from "./PostItem";

interface PostListProps {
  posts: IPost[];
}

const PostsList: FC<PostListProps> = ({ posts }) => {
  return (
    <ul className="post-card__list">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default PostsList;
