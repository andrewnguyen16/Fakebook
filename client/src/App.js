import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import User from "./pages/user/User";
import Friend from "./pages/friend/Friend";
import Authentication from "./helper/Authentication";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/">
          <Authentication>
            <Home />
          </Authentication>
        </Route>
        <Route exact path="/friends">
          <Authentication>
            <Friend />
          </Authentication>
        </Route>
        <Route exact path="/profile">
          <Authentication>
            <Profile />
          </Authentication>
        </Route>
        <Route exact path="/user/:name">
          <Authentication>
            <User />
          </Authentication>
        </Route>
        <Route exact path="*">
          <Authentication>
            <Redirect push to="" />
          </Authentication>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

/*
  - 4 type:
    + Home -> all posts
    + User -> user profile
    + Profile -> my profile
    + Friend -> friends posts
*/
