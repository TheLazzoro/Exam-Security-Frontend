import React, { useEffect, useState } from 'react'
import facade from '../../facades/userFacade';
import './Profile.css'

const Profile = () => {
  const [username, setUsername] = useState("");
  const [file, setFile] = useState();

  useEffect(() => {
    if (facade.getToken() != null) {
      const username = facade.getName();
      if (!username) {
        setUsername("");
      }
      else {
        setUsername(username);
      }
    }
  }, []);

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      const selectedFile = evt.target.files[0];
      console.log(selectedFile);
      setFile(selectedFile);
    }
  }

  const uploadImage = async (evt) => {
    if(!file) {
      return;
    }

    console.log(file)
    await facade.uploadImage(file).then(res => {
      console.log(res);
    }).catch(ex => {
      console.log(ex);
      ex.fullError.then(e => {
        console.log(e);
      });
    });
  }

  return (
    <div className='profile-container'>
      <img className='profile-img' src='https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg?w=1380&t=st=1684156229~exp=1684156829~hmac=29b231cca08e694c33aa854db4c3d4e499f6f5dab509f4d58036788f822cd065' />
      <div>
        <div>
          <label className='lbl-username'>{username}</label>
        </div>
        <br/>
        <div>
          <label>Change Image</label>
          <div>
          <input type="file" id="myFile" name="filename" onChange={handleFileChange} />
          <button onClick={uploadImage} >Upload</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile