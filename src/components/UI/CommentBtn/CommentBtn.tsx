import { FC } from "react";
import cl from "./CommentBtn.module.css";

interface CommentBtnProps {
  comments: number;
}

export const CommentBtn: FC<CommentBtnProps> = ({ comments }) => {
  return (
    <button className={cl.commentBtn}>
      <span className={cl.commentBtnImg}></span>
      {comments}
    </button>
  );
};
