import React, { useEffect, useState } from 'react'
import facade from '../../facades/userFacade';
import threadFacade from '../../facades/threadFacade';

const ThreadPost = ({ post }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    facade.getUserImage(post.author.id).then(res => {
      const image = res.message;
      setImage(image);
    })
  }, []);

  const onDeletePost = () => {
    threadFacade.deletePost(post.id).then(res => {
      window.location.reload();
    }).catch(e => {
      console.log(e.message);
    })
  }

  return (
    <div className='post-content-outer'>
      <div className='post-content'>
        <div className='post-author'>
          <img className='post-author-img' src={image} />
          <br />
          <label className='post-author-name'>{post.author.username}</label>
        </div>
        <textarea className='post-text-box' role='textbox' readOnly>{post.content}</textarea>
        <div>
        </div>
        </div>
        <a className='delete-post' onClick={onDeletePost}>Delete Post</a>
    </div>
  )
}

export default ThreadPost