import { useRef, useState } from "react";
import Button from "../button/Button";
import { baseURL } from "../../utils/constant";
import "./signin.css";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import {
  setError,
  setMessage,
  setshowNotification,
} from "../../store/propertySlice";
import Notification from "../notification/Notification";

const SignIn = () => {
  const message = useSelector((store) => store.properties.message);
  const showNotification = useSelector(
    (store) => store.properties.showNotification
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleOnSignIn = async (e) => {
    e.preventDefault();
    const jsonData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await fetch(`${baseURL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
      const result = await response.json();
      if (
        result.errors &&
        Array.isArray(result.errors) &&
        result.errors.length > 0
      ) {
        const { msg } = result.errors[0];
        dispatch(setMessage(msg));
        dispatch(setshowNotification(true));
        setTimeout(() => {
          dispatch(setshowNotification(false));
          dispatch(setMessage(""));
          navigate("/login");
        }, 3000);
      } else {
        dispatch(addToken(result.token));
        dispatch(setMessage(result.message));
        dispatch(setshowNotification(true));
        setTimeout(() => {
          dispatch(setshowNotification(false));
          dispatch(setMessage(""));
          navigate("/home");
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container">
      {showNotification && <Notification message={message} />}
      <form onSubmit={handleOnSignIn}>
        <h2>SignIn</h2>
        <input type="email" placeholder="Email" ref={emailRef} required />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
        <Button value={"Sign In"} onClick={handleOnSignIn} />
      </form>
    </div>
  );
};

export default SignIn;
