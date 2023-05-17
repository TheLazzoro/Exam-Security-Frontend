import React, { useEffect, useState } from 'react'
import facade from '../../facades/userFacade';
import './Profile.css'

const Profile = () => {
  const [username, setUsername] = useState("");
  const [file, setFile] = useState();
  const [profileImg, setProfileImg] = useState([]);

  // get image
  async function refreshImage(username) {
    await facade.getUserImage_ByUsername(username).then(res => {
      const image = res.message;
      setProfileImg(image);
    });
  }

  useEffect(() => {
    if (facade.getToken()) {
      const username = facade.getName();
      setUsername(username);
      refreshImage(username);
    }

  }, []);

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      const selectedFile = evt.target.files[0];
      setFile(selectedFile);
    }
  }

  const uploadImage = async (evt) => {
    if (!file) {
      return;
    }

    await facade.uploadImage(file).then(res => {
      refreshImage(username);
    }).catch(ex => {
      console.log(ex);
      ex.fullError.then(e => {
        console.log(e);
      });
    });
  }

  return (
    <div className='profile-container'>
      <img className='profile-img' src={profileImg} />
      <div>
        <div>
          <label className='lbl-username'>{username}</label>
        </div>
        <br />
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