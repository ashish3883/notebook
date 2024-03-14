import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    const [cred, setCred] = useState({email:"", password:""});
    let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:cred.email, password:cred.password}),
          });
          const json = await response.json();
          console.log(json)
          if(json.success){
            //Save token & redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/")
          }
          else{
            alert("Enter correct creds")
          }
    }
    const handleChange=(e)=>{
        setCred({...cred, [e.target.name]:e.target.value})
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={cred.email} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={handleChange} value={cred.password} required/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login