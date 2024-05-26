import { Fragment } from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Card from "./components/card/Card";
import SignIn from "./components/auth/SignIn";
import PropertyForm from "./components/property/PropertyForm";
import PropertyDetails from "./components/property/PropertyDetails";
import PropertyPost from "./components/property/PropertyPost";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import { useSelector } from "react-redux";

const App = () => {
  const userToken = useSelector((store) => store.user.token);
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        {userToken && <Route path="/home" element={<Home />} />}
        {userToken && <Route path="/post" element={<PropertyPost />} />}
        {userToken && <Route path="/create-post" element={<PropertyForm />} />}
        {userToken && (
          <Route path="/property-details" element={<PropertyDetails />} />
        )}
      </Routes>
    </Fragment>
  );
};

export default App;
