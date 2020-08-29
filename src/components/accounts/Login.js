import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import LoginValidate from "../../validations/LoginValidations";

const initialValues = {
  email: "",
  password: "",
};

function Login(props) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSebmitting] = useState(false);

  const { isAuthenticated, login } = props;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(LoginValidate(values));
    setIsSebmitting(true);
  }; 
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      login(values);
      setValues({
        ...values,
        email: "",
        password: "",
      });
      // window.location.reload();
    }
  }, [errors]);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container__body">
      <form onSubmit={handleSubmit} autoComplete="off">

        <div className="row">
      <h3 className="text-center form-title mb-4">Login</h3>
          <div className="col-lg-7 col-sm-12 mx-auto mb-3">
            <div className="input-group shadow">
              <span className="input-group-text" id="basic-addon1">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mail w-6 h-6"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </span>
              <input
                name="email"
                onChange={handleChange}
                type="email"
                value={values.email}
                className="form-control py-2"
                placeholder="Enter email"
                aria-label="email"
                aria-describedby="basic-addon1"
              />
            </div>
            {errors.email && (
              <div className="form-text text-danger text-right">
                {errors.email}
              </div>
            )}
          </div>
          <div className="col-lg-7 col-sm-12 mx-auto mb-3">
            <div className="input-group shadow">
              <span className="input-group-text" id="basic-addon1">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="key w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className="form-control py-2"
                placeholder="Enter password"
                aria-label="password"
                aria-describedby="basic-addon1"
              />
            </div>
            {errors.password && (
              <div className="form-text text-danger text-right">
                {errors.password}
              </div>
            )}
          </div>
          <div className="col-lg-7 col-sm-12 mx-auto mb-3">

            <div className="login-flex-helper">
              <div className="form-group light">
                Don't you have an account? <Link to="/register">Sigunp</Link>
              </div>
              <div className="form-group light">
                <Link to="/reset-password">Forget Password</Link>
              </div>
            </div>

            <div className="input-group mx-auto d-block text-right">
              <button
                type="submit"
                className="btn-submit btn btn-primary shadow p-2 px-4"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
