import { useRef } from "react";
import "./register.css";
import axios from "axios";
import {useHistory} from 'react-router'

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(password.current.value !== passwordAgain.current.value){
      passwordAgain.current.setCustomValidity('password do not match')  
    }
    else{
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      };
      try{
      await axios.post('auth/register',user);
       history.push('/login');
      }
      catch(error){
        console.log(error);
      }
    }

  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social App</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Social App.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              className="loginInput"
              ref={username}
              required
            />
            <input 
            placeholder="Email" 
            className="loginInput" 
            ref={email} 
            required
            />
            <input
              placeholder="Password"
              className="loginInput"
              ref={password}
              required
              type="password"
              minLength='4'
            />
            <input
              placeholder="Password Again"
              className="loginInput"
              ref={passwordAgain}
              required
              type="password"
              minLength='4'
            />
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
