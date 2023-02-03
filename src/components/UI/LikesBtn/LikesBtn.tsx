import { FC, MouseEventHandler } from "react";
import cl from "./LikesBtn.module.css";

interface LikesBtnProps {
  handleLike: MouseEventHandler;
  likes: number;
  isActive: boolean;
}

const LikesBtn: FC<LikesBtnProps> = ({ handleLike, likes, isActive }) => {
  return (
    <button
      className={
        isActive ? [cl.likesBtn, cl.likesBtnActive].join(" ") : cl.likesBtn
      }
      onClick={handleLike}
    >
      <span
        className={
          isActive
            ? [cl.likesBtnImg, cl.likesBtnImgActive].join(" ")
            : cl.likesBtnImg
        }
      ></span>
      {likes}
    </button>
  );
};

export default LikesBtn;
