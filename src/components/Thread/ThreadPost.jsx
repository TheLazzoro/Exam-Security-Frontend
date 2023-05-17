import React, { useEffect, useState } from 'react'
import facade from '../../facades/userFacade';

const ThreadPost = ({ post }) => {
  const [image, setImage] = useState(null);
  
  useEffect(() => {
    facade.getUserImage(post.author.id).then(res => {
      const image = res.message;
      setImage(image);
    })
  }, []);

  return (
    <div>
      <div className='post-content'>
        <div className='post-author'>
          <img className='post-author-img' src={image} />
          <br />
          <label className='post-author-name'>{post.author.username}</label>
        </div>
        <textarea className='post-text-box' role='textbox' readOnly>{post.content}</textarea>
      </div>
    </div>
  )
}

export default ThreadPost