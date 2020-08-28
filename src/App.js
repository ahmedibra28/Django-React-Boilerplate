import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout/Layout";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import ChangePassword from "./components/accounts/ChangePassword";
import ResetPassword from "./components/accounts/ResetPassword";

import PrivateRoute from "./components/common/PrivateRoute";

import { store } from "./store";
import { Provider } from "react-redux";

import { loadUser } from "./actions/authActions";

import { transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from "./Alerts";

// Alert Options
const alertOptions = {
  position: "top center",
  timeout: 5000,
  transition: transitions.SCALE,
  width: 10,
  offset: "5px",
};

const NoMatch = ({ location }) => (
  <div>
    <h3>
      {" "}
      No match for <code>{location.pathname}</code>{" "}
    </h3>
  </div>
);

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <div className="App">
            <Router>
              <Alerts />
              <Layout>
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />{" "}
                  <Route exact path="/login" component={Login} />{" "}
                  <Route
                    exact
                    path="/reset-password"
                    component={ResetPassword}
                  />{" "}

                  <Route exact path="/register" component={Register} />{" "}
                  <PrivateRoute
                    exact
                    path="/change-password"
                    component={ChangePassword}
                  />{" "}
                  <Route component={NoMatch} />{" "}
                </Switch>{" "}
              </Layout>{" "}
            </Router>{" "}
          </div>{" "}
        </AlertProvider>{" "}
      </Provider>
    );
  }
}

export default App;
