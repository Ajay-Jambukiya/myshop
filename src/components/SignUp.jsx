import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase/config'
import { toast } from "react-toastify";
import Loader from "./Loader";
import { doc, setDoc } from "firebase/firestore";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate()

  let validateUser = (email, password, cPassword) => {
    let error = {};
    let pattern = /^([a-zA-Z0-9_\!\#\$]+)\@([a-zA-Z0-9]+)\.([a-zA-Z]{3})$/;
    if (email == "") error.emailerr = "Email is required";
    else if (!pattern.test(email)) error.emailerr = "Invalid email";
    if (password == "") error.passworderr = "Password is required";
    if (password != cPassword || cPassword=="") error.cPassworderr = "Passwords not same";
    return error;
  };

  let registerUser = (e) => {
    e.preventDefault();
    setErrors(validateUser(email, password, cPassword));
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {            
            const user = userCredential.user;
            const role = "user"
            const ref = doc(db,"users",userCredential.user.uid)
            await setDoc(ref,{email,password,role})
            setIsLoading(false)
            toast.success("registered successfully")
            navigate('/login')
      })
      .catch((error) => { 
        setIsLoading(false)
        toast.error(error.message)
      });
  };

  
  return (
    <div className="container">
      {isLoading && <Loader/> }
      <div class="card mt-5 shadow ">
        <div className="card-body row">
          <div className="col-5">
            <img
              src={require("../assets/register.png")}
              alt="Title"
              style={{height:"350px"}} className="img-fluid"
            />
          </div>
          <div class="col-6">
            <h2 style={{color:'#3f3d56'}}>Create new account</h2>
            <hr />
            <form onSubmit={registerUser} noValidate>
              <input
                type="text"
                placeholder="Email"
                required
                className="form-control mt-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="text-danger">{errors.emailerr}</span>
              <input
                type="password"
                placeholder="Password"
                required
                className="form-control mt-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="text-danger">{errors.passworderr}</span>
              <input
                type="password"
                placeholder="Confirm Password"
                required
                className="form-control mt-3"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
              <span className="text-danger">{errors.cPassworderr}</span>
              <br/>
              <div className="d-grid mb-2">
              <button type="submit" className="btn btn-warning" style={{backgroundColor:'#e6891e'}}>
                Register
              </button>
              </div>
              <span style={{color:'#3f3d56'}}> Already have an account? <Link to="/login">Log In</Link></span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp
