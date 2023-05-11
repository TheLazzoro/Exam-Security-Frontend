import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import facade from '../../facades/userFacade';
import './Login.css'

const Login = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onTypeUser = (evt) => {
    const newUser = evt.target.value;
    setUser(newUser);
  };

  const onTypePass = (evt) => {
    const newPass = evt.target.value;
    setPass(newPass);
  };

  const onLogin = () => {
    setErrorMsg("");
    facade.login(user, pass).then(res => {

    }).catch(e => {
      setErrorMsg("Login failed");
    });
  };

  return (
    <div className='login-form'>
      <div>
        <input placeholder='Username' onChange={onTypeUser}></input>
      </div>
      <div>
        <input placeholder='Password' type="password" onChange={onTypePass} ></input>
      </div>
      <div>
        <button onClick={onLogin}>Login</button>
      </div>
      <label>{errorMsg}</label>
      <hr/>
      <Link to='/Register'>Register Account</Link>
    </div>
  )
}

export default Login;