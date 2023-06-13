import React, { useState } from 'react'
import ThreadPost from './ThreadPost';
import './ThreadPost.css'

const ThreadPostOP = ({ thread }) => {

  return (
    <div>
      <div>
        <label className='thread-title'>{thread.title}</label>
      </div>
      <ThreadPost post={thread} isOP={true} /> {/* Yes, thread can be passed to post, since they have the same fields in this case. */}
    </div>
  )
}

export default ThreadPostOP