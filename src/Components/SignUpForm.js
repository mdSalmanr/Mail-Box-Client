import React from "react";
import Layout from "./Layout/Layout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./SignUpForm.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../Store";
import { useRef } from "react";

const SignUpForm = () => {
  const EmailInputRef = useRef();
  const PasswordInputRef = useRef();
  const ConfirmPasswordInputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const SwitchAuth = () => {
    setIsLogin((prevState) => !prevState);
  };

  const FormSubmitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = EmailInputRef.current.value;
    const enteredPassword = PasswordInputRef.current.value;
    const enteredConfirmPassword = ConfirmPasswordInputRef.current.value;
    if (enteredPassword !== enteredConfirmPassword) {
      alert("password and confirm password should be same");
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
    try {
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
          //setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              console.log(data);
              let errormessage = "Authantication Failed";
              if (data && data.error && data.error.message) {
                errormessage = data.error.message;
              }
              alert(errormessage);
              throw new Error(errormessage);
            });
          }
        })
        .then((data) => {
          dispatch(authActions.login({ token: data.idToken }));
          console.log(data.idToken);
          //Authctx.login(data.idToken);
          console.log(data);
          //setEmail(enteredEmail);
          //history.replace("/login");
          navigate("/home");
        })
        
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  return (
    <Layout>
      <Form
        className="form-1  shadow-sm p-3 mb-5 bg-body-tertiary rounded"
        onSubmit={FormSubmitHandler}
      >
        <h4>{isLogin ?"Login":"Sign Up"}</h4>
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

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="password"
            placeholder="Enter Confirm password"
            ref={ConfirmPasswordInputRef}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {isLogin?"Login":"Sign Up"}
        </Button>
      </Form>
      <Button className="btn-1" variant="secondary" onClick={SwitchAuth} >
        Have an account?login
      </Button>
    </Layout>
  );
};

export default SignUpForm;
