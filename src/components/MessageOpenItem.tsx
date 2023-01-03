import { FC } from 'react'
import getDate from '../helpers/getDate';
import { IMessage, ICurrentUser, IUser } from '../types/types';

interface MessageOpenItemProps {
  secondUser: ICurrentUser,
  item: IMessage,
  currentUser: IUser,
  senderUser: Boolean,
}

const MessageOpenItem:FC<MessageOpenItemProps> = ({secondUser, item, currentUser, senderUser}) => {
  return (
    <div className='messages__item'>
      <img 
        className='messages__img'
        alt={senderUser ? currentUser.name : secondUser.displayName}
        src={senderUser ? currentUser.photoURL : secondUser.photoUrl}
      />
      <div>
        <div className='messages__item-header'>
          <h2>{senderUser ? currentUser.name : secondUser.displayName}</h2>
          <span>{getDate(item.date.seconds.toString())}</span>
        </div>
        <p className='messages__item-description'>
          {item.textMessage}
        </p>
      </div>
    </div>
  )
}

export default MessageOpenItem