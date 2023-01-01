import '../styles/components/postCreate.scss';
import {FC, useState} from 'react'

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

  return (
    <div className='card create-post__card'>
      <input onChange={(e) => setPostBody(e.target.value)} value={postBody} className='create-post__card-input' type="text" placeholder='Whats new?'/>
      <button className='create-post__card-button small-btn' onClick={() => createPost()}>Publish</button>
    </div>
  )
}

export default PostCreate