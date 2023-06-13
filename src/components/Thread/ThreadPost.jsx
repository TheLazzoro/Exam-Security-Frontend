import React, { useEffect, useState } from 'react'
import facade from '../../facades/userFacade';
import threadFacade from '../../facades/threadFacade';
import { useNavigate } from 'react-router-dom';

const ThreadPost = ({ post, isOP }) => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    facade.getUserImage(post.author.id).then(res => {
      const image = res.message;
      setImage(image);
    })
  }, []);

  const onDeletePost = () => {
    
    // hacky stuff. since thread content and post content are the same, we disginguish between them here.
    if(isOP) {
      threadFacade.deleteThread(post.id).then(res => {
        navigate("/");
      }).catch(ex => {
        console.log(ex.message);
      });
      return;
    }

    threadFacade.deletePost(post.id).then(res => {
      if(res.status == 200) {
        window.location.reload();
      }
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