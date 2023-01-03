import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ICurrentUser } from '../types/types'
import { addCurrentUser } from '../app/feautures/currentUserSlice'
import getDate from 'date-fns/getDate'

type IChat = {
  date: {seconds: string, nanoseconds: string},
  userInfo: ICurrentUser,
  lastMessage?: {textMessage: string},
}

interface MessageItemProps {
  openDialog: Function,
  chat: IChat,
}

const MessageItem:FC<MessageItemProps> = ({openDialog, chat}) => {

  const dispatch = useDispatch();

  const addUser = (value: ICurrentUser) => {
    dispatch(addCurrentUser(value));
  }

  return (
    <Link onClick={() => addUser(chat.userInfo)} className='message__item-content' to={`/message/${openDialog(chat.userInfo.uid)}`} key={chat.userInfo.uid}>
      <img className="message__image" alt={chat.userInfo.displayName} src={chat.userInfo.photoUrl}/>
      <div className='message__about'>
        <div>
          <h2 className='message__name'>{chat.userInfo.displayName}</h2>
          {chat.lastMessage && <h4>{chat.lastMessage.textMessage}</h4>}
        </div>
        {chat.date && <span>{getDate(+chat.date.seconds)}</span>}
      </div>
    </Link>
  )
}

export default MessageItem


// seconds
// :
// 1672739143
// nanoseconds
// :


// uid
// :
// "OiJkw5h1dybtVKSwUHzQEV9imhx2"
// photoUrl
// :
// "https://firebasestorage.googleapis.com/v0/b/vk-react-app.appspot.com/o/egor%40gmail.com?alt=media&token=a9cd810e-05e6-4c55-9b33-07c1bed923a9"
// displayName
// :
