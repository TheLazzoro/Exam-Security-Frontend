import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ThreadPost from '../../components/Thread/ThreadPost'
import ThreadPostOP from '../../components/Thread/ThreadPostOP'
import './Thread.css'
import facade from '/src/facades/threadFacade'

const Thread = () => {
  const { threadId } = useParams(); // routed ID
  const [thread, setThread] = useState(null);
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [replytext, setReplyText] = useState("");

  useEffect(() => {
    facade.getThreadById(threadId).then(res => {
      setThread(res);
    });
    facade.getPostsByThreadId(threadId).then(res => {
      console.log(res);
      setPosts(res);
    });
  }, []);

  const onWriteReply = (evt) => {
    const text = evt.target.value;
    setReplyText(text);
  }

  const postReply = async () => {
    console.log(replytext)
    await facade.createPost(threadId, replytext).then(res => {
      setRefresh(!refresh);
    }).catch(ex => {
      
      console.log(ex);
    })

  }

  return (
    <div>
      {
        !thread ? null :
          <div className='thread-box'>
            <ThreadPostOP thread={thread} />
            {
              !posts ? null :
                posts.map(el =>
                  <ThreadPost post={el} />
                )
            }
            <textarea onChange={onWriteReply} className='thread-textbox-new'/>
            <button onClick={postReply}>Post Reply</button>
          </div>
      }
    </div>
  )
}

export default Thread