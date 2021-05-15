import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./register.css";
import { addUser, userSelector } from "../../store/userSlice";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../graphql/users";
import { LoadingSpinner } from "../../helper/Spinner";
import { register } from "../../alert";

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // check if user is already login
  const length = useSelector(userSelector.selectTotal);
  if (length !== 0) history.push("/");

  const [regUser, { loading }] = useMutation(REGISTER, {
    onError(err) {
      setError(err.graphQLErrors[0].message);
    },
    onCompleted(data) {
      console.log(data);
      const { username, token } = data.register;
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", username);
      dispatch(addUser(data.register));
    },
  });

  if (loading) return LoadingSpinner(loading);
  if (error) return <h1>Error, please comeback later!!!</h1>;

  const submitRegister = () => {
    if (!username) return register("Username must not empty!");
    if (!password) return register("Password must not empty!");
    if (password !== confirmPassword) return register("Password and ConfirmPassword not match!");
    if (password.length < 6) return register("Password length must greater or equal to 6!");
    if (username.length > 15) return register("Password length must less than 15!");
    regUser({ variables: { username, password } });
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Fakebook</h3>
          <span className="loginDesc">Connect with friends and the world around you on Fakebook.</span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="loginInput" />
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password (length >= 6)" className="loginInput" />
            <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" className="loginInput" />
            <button onClick={submitRegister} className="loginButton">
              Sign Up
            </button>
            <button onClick={() => history.push("/login")} className="loginRegisterButton">
              Log into Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
