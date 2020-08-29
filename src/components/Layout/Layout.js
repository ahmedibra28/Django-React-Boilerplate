import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";
import logo from "./logo.jpg";

function Layout(props) {
  const authArea = (
    <ul className="navbar-nav mr-right mb-2 mb-lg-0">
      <li className="nav-item">
        <a className="nav-link">
          {props.auth.user ? props.auth.user.first_name ? `Welcome  ${props.auth.user.first_name}` : `Welcome ${props.auth.user.email}` : ""}
        </a>
      </li>
      <li className="nav-item">
        <Link to="/change-password" className="nav-link">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="user-add w-6 h-6 mr-1"
          >
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
          </svg>
          Change Passord
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" onClick={props.logout} className="nav-link">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="logout w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            ></path>
          </svg>
          Logout
        </Link>
      </li>
    </ul>
  );
  const guestArea = (
    <ul className="navbar-nav mr-right mb-2 mb-lg-0">
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="user-add w-6 h-6"
          >
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
          </svg>
          Singup
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" onClick={props.logout} className="nav-link">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="logout w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            ></path>
          </svg>
          Login
        </Link>
      </li>
    </ul>
  );
  return (
    <>
      <nav className="navbar navbar-expand-lg py-3 shadow">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggler"
            aria-controls="navbarToggler"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="brand-svg cursor-pointer text-gray-100 md:hidden"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </button>
          <Link to="/" className="navbar-brand">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top mr-2"
              alt=""
              loading="lazy"
            />
            BRAND
          </Link>
          <div className="collapse navbar-collapse" id="navbarToggler">
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0"></ul>
            {props.auth.isAuthenticated ? authArea : guestArea}
          </div>
        </div>
      </nav>

      <div className="container">{props.children}</div>

      <div className="text-muted card-footer pt-20  text-center">
        Developer Contact -{" "}
        <strong>
          <a href="mailto:ahmaat19@gmail.com">ahmaat19@gmail.com</a>
        </strong>
      </div>
    </>
  );
}

Layout.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Layout);
