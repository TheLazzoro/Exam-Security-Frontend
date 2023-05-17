import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import facade from '../../facades/userFacade'
import './ThreadCard.css'

const ThreadCard = ({ thread }) => {
  const [image, setImage] = useState(null)

  useEffect(() => {
    const id = thread.author.id;
    facade.getUserImage(id).then( res => {
      const imageURL = res.message;
      setImage(imageURL);
    })
  }, [])

  return (
    <div className='thread-card'>
    <img className='author-img' src={image} />
      <div>
        <div>
          <Link to={'Thread/' + thread.id} >{thread.title}</Link>
        </div>
        <div>
          <label className='author-label'>
            Author: {thread.author.username}
          </label>
        </div>
      </div>
    </div>
  )
}

export default ThreadCard