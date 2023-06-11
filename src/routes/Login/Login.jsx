import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import facade from '../../facades/userFacade';
import './Login.css'

const Login = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [captchaImg, setCaptchaImg] = useState(null);
  const navigate = useNavigate();

  const onTypeUser = (evt) => {
    const newUser = evt.target.value;
    setUser(newUser);
  };

  const onTypePass = (evt) => {
    const newPass = evt.target.value;
    setPass(newPass);
  };

  const onTypeCaptcha = (evt) => {
    const captcha = evt.target.value;
    setCaptcha(captcha);
  };

  const onKeyDown = (evt) => {
    if (evt.key === "Enter")
      onLogin();
  }

  const onLogin = () => {
    let capcthaInput = undefined;
    if (captcha) {
      capcthaInput = captcha;
    }

    setErrorMsg("");
    facade.login(user, pass, capcthaInput).then(res => {
      navigate("/");
    }).catch(e => {
      setErrorMsg("Login failed");
      e.fullError.then(ex => {
        const image = ex.captcha; // Base64 encoded image
        console.log(ex);
        if (image != undefined) {
          setCaptchaImg("data:image/jpg;base64," + image);
        }
      });
    });
  };

  return (
    <div className='login-form'>
      <div>
        <input placeholder='Username' onChange={onTypeUser} onKeyDown={onKeyDown}></input>
      </div>
      <div>
        <input placeholder='Password' type="password" onChange={onTypePass} onKeyDown={onKeyDown}></input>
      </div>
      <div>
        <button onClick={onLogin}>Login</button>
      </div>
      <label>{errorMsg}</label>
      <br />
      <br />
      <div>
        {
          !captchaImg ? null :
            <div>
              <div>

                <img src={captchaImg} />
                <div>
                  <label>Type the text displayed above</label>
                </div>
              </div>
              <input style={{ width:"220px" }} onChange={onTypeCaptcha} onKeyDown={onKeyDown} />
            </div>
        }
      </div>
      <hr />
      <Link to='/Register'>Register Account</Link>
    </div>
  )
}

export default Login;