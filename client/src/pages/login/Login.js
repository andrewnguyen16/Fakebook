import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./login.css";
import { LOGIN } from "../../graphql/users";
import { userSelector, addUser } from "../../store/userSlice.js";
import { LoadingSpinner } from "../../helper/Spinner";
import { login } from "../../alert";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // check if user is already login
  const length = useSelector(userSelector.selectTotal);
  if (length !== 0) history.push("/");

  const [loginUser, { loading }] = useMutation(LOGIN, {
    onError(err) {
      setError(err.graphQLErrors[0].message);
    },
    onCompleted(data) {
      const { username, token } = data.login;
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", username);
      dispatch(addUser(data.login));
    },
  });

  if (loading) return LoadingSpinner(loading);

  const submitLogin = () => {
    if (!username) return login("Username must not be empty!");
    if (!password) return login("Password must not be empty!");
    loginUser({ variables: { username, password } });
  };

  return (
    <div className="login">
      <div className="loginWrapperLogin">
        <div className="loginLeft">
          <h3 className="loginLogo">Fakebook</h3>
          <span className="loginDesc">Connect with friends and the world around you on Fakebook.</span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Username" className="loginInput" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" className="loginInput" onChange={(e) => setPassword(e.target.value)} />
            <button className="loginButton" onClick={submitLogin}>
              Log In
            </button>
            {error && <h5 className="loginError">{error}</h5>}
            <button className="loginRegisterButton" onClick={() => history.push("/register")}>
              Create a New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
