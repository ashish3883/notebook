import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [cred, setCred] = useState({name:"", email:"", password:"", confirmpassword:""});
  let navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const {name, email, password, confirmpassword} = cred;
    if(password!==confirmpassword){
      alert("Password & Confirm password didn't same");
      return;
    }
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name, email, password}),
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
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name*</label>
          <input type="text" className="form-control" id="name" name='name' onChange={handleChange} aria-describedby="emailHelp" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email*</label>
          <input type="email" className="form-control" id="email" name='email' onChange={handleChange} aria-describedby="emailHelp" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password*</label>
          <input type="password" className="form-control" id="password" name='password' onChange={handleChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">Confirm Password*</label>
          <input type="password" className="form-control" id="confirmpassword" name='confirmpassword' onChange={handleChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup