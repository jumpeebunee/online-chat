import '../styles/components/postCreate.scss';
import {FC, useState, KeyboardEvent} from 'react'

interface PostCreateProps {
  createNewPost: Function,
}

const PostCreate:FC<PostCreateProps> = ({createNewPost}) => {

  const [postBody, setPostBody] = useState('');

  const createPost = () => {
    if (postBody.length > 1) {
      createNewPost(postBody);
      setPostBody('');
    }
  }

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') createPost();
  }

  return (
    <div className='create-post__card'>
      <input onKeyDown={(e) => handleKey(e)} onChange={(e) => setPostBody(e.target.value)} value={postBody} className='create-post__card-input' type="text" placeholder='Whats new?'/>
      <button className='create-post__card-button small-btn' onClick={() => createPost()}>Publish</button>
    </div>
  )
}

export default PostCreate