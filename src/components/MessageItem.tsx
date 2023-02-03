import { FC } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ICurrentUser } from "../types/types";
import { addCurrentUser } from "../app/feautures/currentUserSlice";
import getDate from "../helpers/getDate";

type IChat = {
  date: { seconds: string; nanoseconds: string };
  userInfo: ICurrentUser;
  lastMessage?: { textMessage: string };
};

interface MessageItemProps {
  openDialog: Function;
  chat: IChat;
}

const MessageItem: FC<MessageItemProps> = ({ openDialog, chat }) => {
  const dispatch = useDispatch();

  const addUser = (value: ICurrentUser) => {
    dispatch(addCurrentUser(value));
  };

  return (
    <Link
      onClick={() => addUser(chat.userInfo)}
      className="message__item-content"
      to={`/message/${openDialog(chat.userInfo.uid)}`}
      key={chat.userInfo.uid}
    >
      <img
        className="message__image"
        alt={chat.userInfo.displayName}
        src={chat.userInfo.photoUrl}
      />
      <div className="message__about">
        <div>
          <h2 className="message__name">{chat.userInfo.displayName}</h2>
          {chat.lastMessage && <h4>{chat.lastMessage.textMessage}</h4>}
        </div>
        {chat.date && <span>{getDate(chat.date.seconds)}</span>}
      </div>
    </Link>
  );
};

export default MessageItem;
