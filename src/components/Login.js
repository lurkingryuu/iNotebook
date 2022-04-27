import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alert/AlertContext';

function Login() {

    const {showAlert} = useContext(AlertContext);

    const [userLogin, setUserLogin] = useState({email: "", password: ""})
    let history = useNavigate();

    const auth_api = "http://localhost:3001/api/auth/"

    const login = async (email, password)=>{const response = await fetch(`${auth_api}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email, password
        }),
      });
      const json = await response.json();

      if(json.success) {
        //   redirect
        localStorage.setItem('token', json.authToken);
        history('/home');
        showAlert("Logged In Successful", "success")
      }
      else {
          console.log(json);
          showAlert(json.error, "danger");
      }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setUserLogin({email: userLogin.email, password: userLogin.password});
        await login(userLogin.email, userLogin.password);
        setUserLogin({email: "", password: ""});
    }
    const onChange = (event)=>{
        setUserLogin({...userLogin, [event.target.name]: event.target.value})
    }


    return (
        <div className='Login'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} value={userLogin.email} required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password (Minimum 8 characters)</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={userLogin.password} pattern=".{8,}" minLength={8} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Login;