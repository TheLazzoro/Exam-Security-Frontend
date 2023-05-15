import React, { useState } from 'react'
import facade from '../../facades/userFacade';
import './CreateAccount.css'

const CreateAccount = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [pass_rep, setPass_rep] = useState("");
  const [msg, setMsg] = useState("");
  const [msgColor, setMsgColor] = useState("");

  const typeUser = (evt) => {
    const value = evt.target.value;
    setUser(value);
  };
  const typePass = (evt) => {
    const value = evt.target.value;
    setPass(value);
  };
  const typePass_rep = (evt) => {
    const value = evt.target.value;
    setPass_rep(value);
  };

  const onRegister = () => {
    setMsg("");
    if (user.length == 0) {
      setMsg("Please choose a username");
      return;
    }
    if (pass != pass_rep) {
      setMsg("Passwords do not match");
      return;
    }

    facade.createUser(user, pass).then(res => {
      setMsg(res.message);
      setMsgColor("#3a3");
    }).catch(e => {
      e.fullError.then(ex => {
        setMsg(ex.Message);
        setMsgColor("#f33");
      });
    });
  };

  return (
    <div>
      <div className='create-form'>
        <div>
          Create Account
        </div>
        <div>
          <input onChange={typeUser} placeholder='Username'></input>
        </div>
        <div>
          <input onChange={typePass} type='password' placeholder='Password'></input>
        </div>
        <div>
          <input onChange={typePass_rep} type='password' placeholder='Respeat Password'></input>
        </div>
        <div>
          <button onClick={onRegister}>Register</button>
        </div>
        <div>
          <label style={{ color: msgColor }}>{msg}</label>
        </div>
      </div>
    </div>
  )
}

export default CreateAccount