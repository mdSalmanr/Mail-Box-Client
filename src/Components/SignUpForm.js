import React, { useState, useRef } from "react";
import Layout from "./Layout/Layout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./SignUpForm.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../Store";

const SignUpForm = () => {
  const EmailInputRef = useRef();
  const PasswordInputRef = useRef();
  const ConfirmPasswordInputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const SwitchAuth = () => {
    setIsLogin((prevState) => !prevState);
  };
  
  const FormSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const enteredEmail = EmailInputRef.current.value;
    const enteredPassword = PasswordInputRef.current.value;
    const enteredConfirmPassword = ConfirmPasswordInputRef.current.value;
    
    if (!isLogin && enteredPassword !== enteredConfirmPassword) {
      alert("Password and confirm password should be the same");
      setIsLoading(false);
      return;
    }
    
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCuFCVQntgkKez8Gd6N5xVCI6am0X6I6G4";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCuFCVQntgkKez8Gd6N5xVCI6am0X6I6G4";
    }
    
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      
      .then((data) => {
        // Store both token and user email in Redux
        dispatch(
          authActions.login({ 
            token: data.idToken,
            email: enteredEmail,
            userId: data.localId
          })
        );
        
        // Also store in localStorage for persistence
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('email', enteredEmail);
        localStorage.setItem('userId', data.localId);
        
        console.log("Authentication successful");
        navigate("/mail");
      })
     
      .catch((error) => {
        alert(error.message);
        console.error(error.message);
        setIsLoading(false);
      });
  };
  
  return (
    <Layout>
      <Form
        className="form-1 shadow-sm p-3 mb-5 bg-body-tertiary rounded"
        onSubmit={FormSubmitHandler}
      >
        <h4>{isLogin ? "Login" : "Sign Up"}</h4>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={EmailInputRef}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            ref={PasswordInputRef}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Control
            type="password"
            placeholder={isLogin ? "Confirm password (not required for login)" : "Confirm password"}
            ref={ConfirmPasswordInputRef}
            required={!isLogin}
            disabled={isLogin}
          />
        </Form.Group>
        
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : (isLogin ? "Login" : "Sign Up")}
        </Button>
      </Form>
      
      <Button className="btn-1" variant="secondary" onClick={SwitchAuth}>
        {isLogin ? "Need an account? Sign up" : "Have an account? Login"}
      </Button>
    </Layout>
  );
};

export default SignUpForm;