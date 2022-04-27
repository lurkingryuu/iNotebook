import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alert/AlertContext';

function Signup() {

    const {showAlert} = useContext(AlertContext);

    const [userSignup, setUserSignup] = useState({name: "", email: "", password: "", cpassword: ""})
    let history = useNavigate();

    const auth_api = "http://localhost:3001/api/auth/"

    const signup = async (name, email, password)=>{const response = await fetch(`${auth_api}createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name, email, password
        }),
      });
      const json = await response.json();

      if(json.success) {
        //   redirect
        localStorage.setItem('token', json.authToken);
        history('/home');
        showAlert("Account created successfully", 'success');
      }
      else {
          showAlert(json.error, 'warning');
      }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name, email, password, cpassword} = userSignup;
        setUserSignup({name, email, password, cpassword});
        await signup( userSignup.name, userSignup.email, userSignup.password);
        setUserSignup({name: "", email: "", password: "", cpassword: ""});
    }
    const onChange = (event)=>{
        setUserSignup({...userSignup, [event.target.name]: event.target.value})
    }


    return (
        <div className='Signup'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={userSignup.name} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} value={userSignup.email} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={userSignup.password} minLength={8} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} value={userSignup.cpassword} minLength={8} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Signup;