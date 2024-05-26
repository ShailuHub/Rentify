import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import Button from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { onLogOut, setToggleAuth } from "../../store/userSlice";

const Navbar = () => {
  const userToken = useSelector((store) => store.user.token);
  const toggleAuth = useSelector((store) => store.user.toggleAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOnSignIn = () => {
    dispatch(setToggleAuth());
    navigate("/login");
  };
  const handleOnRegister = () => {
    dispatch(setToggleAuth());
    navigate("/register");
  };
  const handleOnAddPost = () => {
    navigate("/create-post");
  };
  const handleOnLogOut = () => {
    dispatch(onLogOut());
    navigate("/login");
  };
  return (
    <header>
      <nav>
        <p id="logo">
          R<span>entify</span>
        </p>
        {userToken && (
          <div id="navbar-links">
            <NavLink to={"/home"}>HOME</NavLink>
            <NavLink to={"/post"}>POST</NavLink>
          </div>
        )}
        {!userToken && (
          <div className="navbar-buttons">
            {!toggleAuth && (
              <Button value={"SIGN IN"} onClick={handleOnSignIn} />
            )}
            {toggleAuth && (
              <Button value={"SIGN Up"} onClick={handleOnRegister} />
            )}
          </div>
        )}

        {userToken && (
          <div className="navbar-buttons">
            <Button value={"LogOut"} onClick={handleOnLogOut} />
            <Button value={"Add post"} onClick={handleOnAddPost} />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
