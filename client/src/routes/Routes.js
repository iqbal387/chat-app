import { Route, Switch } from "react-router";

import Login from "pages/Login";
import Register from "pages/Register";
import Home from "pages/Home";

const Routes = () => (
  <Switch>
    <Route path="/login" exact>
      <Login />
    </Route>
    <Route path="/register" exact>
      <Register />
    </Route>
    <Route path="/" exact>
      <Home />
    </Route>
    <Route path="*" exact>
      <h1>Page Not Found</h1>
    </Route>
  </Switch>
);

export default Routes;
