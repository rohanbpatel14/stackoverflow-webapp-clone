import React, { useState } from "react";
import { Link,useHistory } from "react-router-dom";
import { signup } from "../auth/helper/authapicalls";

const Signup = () => {

  const history = useHistory();
  const [values, setValues] = useState({
    displayName: "",
    lastName: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { displayName, email, password, error, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ full_name: displayName, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            displayName: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in signup"));
  };
//   const RedirectToLogin = ()=>{
//     history.push("/login");
//   }
  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 text-center">
          <h1 className="text-dark">Join the Stack Overflow community</h1>
        </div>
        <div className="col-md-4 text-left bg-white p-3 offset-md-1 rounded shadow p-3 mb-5 mt-5">
          <form>
            <div className="row">
            <div className="form-group">
              <label className="text-secondary">Display Name</label>
              <input
                className="form-control"
                onChange={handleChange("displayName")}
                type="text"
                value={displayName}
              />
            </div>
            </div>            
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
            <button onClick={onSubmit} className="btn btn-primary w-100 rounded mt-2" type="button">Sign Up</button>  
            {/* <div onClick={RedirectToLogin}>Already have an account? Log in</div>  */}
            <Link          
          className="nav-link text-warning text-center"
          to="/login"
        >
        Already have an account? Log in
        </Link> 
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-7 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please
            <Link to="/login">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-7 text-left">
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

  return (
      <div>
          {signUpForm()}
          {successMessage()}
          {errorMessage()}   
      </div>
  );
};

export default Signup;