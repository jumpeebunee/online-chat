import "../styles/components/commentList.scss";
import { FC } from "react";
import { IPost } from "../types/types";
import getDateToNow from "../helpers/getDateToNow";
import getDate from "../helpers/getDate";

interface CommentsListProps {
  post: IPost;
}

const CommentsList: FC<CommentsListProps> = ({ post }) => {
  return (
    <ul className="comment__list">
      {post.comments.map((comment) => (
        <li className="comment__item" key={comment.date.nanoseconds}>
          <img className="comment__item-img" src={comment.user.photoURL} />
          <div className="comment__item-content">
            <h3>{comment.user.name}</h3>
            <p>{comment.body}</p>
            <span>
              {getDateToNow((+comment.date.seconds * 1000).toString())} in{" "}
              {getDate(comment.date.seconds)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
