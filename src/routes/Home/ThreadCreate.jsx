import React, { useState } from 'react'
import facade from '../../facades/threadFacade';
import './Home.css'

const ThreadCreate = ({ setRefresh, setIsModalOpen }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [textColor, setTextColor] = useState("");
  const [responseText, setResponseText] = useState("");

  const onCloseMenu = () => {
    setIsModalOpen(false)
  }

  const onTypeTitle = (evt) => {
    const value = evt.target.value;
    setTitle(value);
  }

  const onTypeContent = (evt) => {
    const value = evt.target.value;
    setContent(value);
  }

  const onCreateThread = () => {
    setIsCreating(true);
    facade.createThread(title, content).then(res => {
      setIsModalOpen(false);
      setRefresh([]);
    }).catch(e => {
      console.log(e);
    });
    setIsCreating(false);
  }

  return (
    <div id="myModal" className='modal' >
      <div className="modal-content  modal-create-activity" >
        <span className='btn-close' onClick={onCloseMenu}>&times;</span>
        <p style={{ fontSize: 20 }}>Create New Thread</p>
        <div>
          <input id='name' placeholder='Title' onChange={onTypeTitle} />
          <textarea className='text-area' onChange={onTypeContent} />
          <br />
          <br />
          <br />
          <div>
            <button onClick={onCreateThread} disabled={isCreating}>Create</button>
          </div>
          <p style={{ color: textColor }}>{responseText}</p>
        </div>
      </div>
    </div>
  )
}

export default ThreadCreate