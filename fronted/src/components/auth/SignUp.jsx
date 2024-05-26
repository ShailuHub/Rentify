import "./signin.css";
import Button from "../button/Button";
import { useRef } from "react";
import { baseURL } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setMessage,
  setshowNotification,
} from "../../store/propertySlice";
import Notification from "../notification/Notification";

const SignUp = () => {
  const error = useSelector((store) => store.properties.error);
  const message = useSelector((store) => store.properties.message);
  const showNotification = useSelector(
    (store) => store.properties.showNotification
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();

  const handleOnRegister = async (e) => {
    e.preventDefault();

    const jsonData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      phone: phoneRef.current.value,
    };

    try {
      const response = await fetch(`${baseURL}/api/user/register`, {
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
          navigate("/register");
        }, 3000);
      } else {
        dispatch(setMessage(result.message));
        dispatch(setshowNotification(true));
        setTimeout(() => {
          dispatch(setshowNotification(false));
          dispatch(setMessage(""));
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="form-container">
      {showNotification && <Notification error={error} />}
      {showNotification && <Notification message={message} />}
      <form onSubmit={handleOnRegister}>
        <h2>SignUp</h2>
        <input
          type="text"
          placeholder="First name"
          ref={firstNameRef}
          required
        />
        <input type="text" placeholder="Last name" ref={lastNameRef} required />
        <input type="email" placeholder="Email" ref={emailRef} required />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
        <input type="tel" placeholder="Phone" ref={phoneRef} required />
        <Button value={"Register"} onClick={handleOnRegister} />
      </form>
    </div>
  );
};

export default SignUp;
