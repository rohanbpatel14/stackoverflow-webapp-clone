import React, { useEffect, useState } from "react";
import {Container} from "react-bootstrap"
import { Link, Redirect,useHistory } from "react-router-dom";
import {signin, authenticate, isAutheticated, } from "../auth/helper/authapicalls"
import Navbar from "../Components/Navbar";

import "../App.css"
const Login = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect:false
  });

  const { email, password, error, loading, didRedirect } = values;
  // const {user}= isAutheticated();
  const handleChange = email => event => {
    setValues({ ...values, error: false, [email]: event.target.value });
  };

  const loadingMessage = () => {
    return (
      loading &&(
        <div className="alert alert-info">
          <h2>Loadiing...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };


  const onSubmit = event =>{
      event.preventDefault();
    setValues({...values,error:false,loading:true})
    signin({email,password})
    .then(data =>{
      if(data.error){
        setValues({...values,error:data.error,loading:false})
        console.log(data.error)
      }else{
        if(authenticate(data))
        {
          const {user} = JSON.parse(localStorage.getItem("jwt"));
          if (user && user.role === 1) {
            history.push("/admin")
          } else{
            history.push("/");
          }
        }
      }
    })
    .catch(err=>console.log(err))
  }
 
  const signInForm = () => {
    return (
      <>
      <Navbar />
      <Container className="login">
           <div className="col-md-4 text-left bg-white p-3 rounded shadow p-3 mb-5 mt-5">
          <form>            
            <div className="form-group">
              <label className="text-secondary">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-secondary">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
              />
            </div>
            <Link          
          className="nav-link text-danger text-center"
          to="/forgotpassword"
        >
        <u>Forgotten Password?</u>
        </Link>   
            <button onClick={onSubmit} className="btn btn-primary w-100 rounded mt-2 mb-2" type="button">Sign in</button>                      
           <div><Link className="nav-link text-warning text-center" to="/signup">Don’t have an account? Sign up</Link></div>                  
          </form>
        </div>
      </Container>
      </>
    
     
    );
  };

  return (
    <div>
         {loadingMessage()}
        {errorMessage()}
        {signInForm()}
        {/* {didRedirect && performRedirect()} */}
    </div>
  );
};

export default Login;