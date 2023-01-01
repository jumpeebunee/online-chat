import '../styles/components/postItem.scss';
import { FC } from "react"
import { IPost } from "../types/types"
import {formatDistanceToNow } from 'date-fns'

interface PostItemProps {
  post: IPost,
}

function getDate(date:string) {
  const validDate = new Date(+date);  
  return formatDistanceToNow(validDate, {addSuffix: true});
}

const PostItem:FC<PostItemProps> = ({post}) => {
  return (
    <li className='card' key={post.id}>
      <div className='post-card__header'>
        <img src={post.img} alt={post.name}/>
        <div className='post-card__header-description'>
          <h5>{post.name}</h5>
          <span>{getDate(post.date)}</span>
        </div>
      </div>
      <p className='post-card__body'>{post.body}</p>
    </li>
  )
}

export default PostItem