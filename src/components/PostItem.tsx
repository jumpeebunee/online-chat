import { FC } from "react"
import { IPost } from "../types/types"

interface PostItemProps {
  post: IPost,
}

function getDate(date:string) {
  const validDate = new Date(+date);
  return validDate.toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
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