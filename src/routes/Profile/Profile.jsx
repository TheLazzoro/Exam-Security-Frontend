import React, { useEffect, useState } from 'react'
import facade from '../../facades/userFacade';
import './Profile.css'

const Profile = () => {
  const [username, setUsername] = useState("");
  const [file, setFile] = useState();
  const [profileImg, setProfileImg] = useState([]);

  // get image
  async function refreshImage() {
    const image = await facade.getUserImage(1); // TODO: Hardcoded user id
    const imageObject = URL.createObjectURL(image);
    setProfileImg(imageObject);
    console.log(image);
    console.log(imageObject);
  }

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

    refreshImage();

  }, []);

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      const selectedFile = evt.target.files[0];
      console.log(selectedFile);
      setFile(selectedFile);
    }
  }

  const uploadImage = async (evt) => {
    if (!file) {
      return;
    }

    console.log(file)
    await facade.uploadImage(file).then(res => {
      refreshImage();
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