import React from 'react'
import './ThreadCard.css'

const ThreadCard = ({ thread }) => {
  return (
    <div className='thread-card'>
    <img className='profile-img' src='https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg?w=1380&t=st=1684156229~exp=1684156829~hmac=29b231cca08e694c33aa854db4c3d4e499f6f5dab509f4d58036788f822cd065' />
      <div>
        <div>
          <a >{thread.title}</a>
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