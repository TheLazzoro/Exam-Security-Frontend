import React, { useState } from 'react'
import facade from '../../facades/userFacade';
import './CreateAccount.css'

const CreateAccount = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [pass_rep, setPass_rep] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
    setErrorMsg("");
    if(user.length == 0) {
      setErrorMsg("Please choose a username");
      return;
    }
    if(pass != pass_rep) {
      setErrorMsg("Passwords do not match");
      return;
    }

    facade.createUser(user, pass).then(res => {

    }).catch(e => {
      e.fullError.then(ex => {
        setErrorMsg(ex.message);
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
          <label className='error'>{errorMsg}</label>
        </div>
      </div>
    </div>
  )
}

export default CreateAccount