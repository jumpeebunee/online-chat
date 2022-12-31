import '../styles/components/postCreate.scss';
import {FC, useState} from 'react'

interface PostCreateProps {
  createNewPost: Function,
}

const PostCreate:FC<PostCreateProps> = ({createNewPost}) => {

  const [postBody, setPostBody] = useState('');

  return (
    <div className='card create-post__card'>
      <input onChange={(e) => setPostBody(e.target.value)} className='create-post__card-input' type="text" placeholder='Что у вас нового?'/>
      <button className='create-post__card-button small-btn' onClick={() => createNewPost(postBody)}>Отправить</button>
    </div>
  )
}

export default PostCreate