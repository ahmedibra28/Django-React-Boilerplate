import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import RegisterValidate from "../../validations/RegisterValidations";

const initialValues = {
  email: "",
  password1: "",
  password2: ""
};
function Register(props) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSebmitting] = useState(false);

  const { isAuthenticated, register } = props;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(RegisterValidate(values));
    setIsSebmitting(true);
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) { 
      register(values);
      console.log(values);
      setValues({
        ...values,
        email: "",
        password1: "",
        password2: "",
      });
    }
  }, [errors]);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="container__body">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="row">
          <h3 className="text-center form-title mb-4">Signup</h3>

            

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
                  value={values.email}
                  onChange={handleChange}
                  type="text"
                  className="form-control py-2"
                  placeholder="Enter email"
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
                  name="password1"
                  value={values.password1}
                  onChange={handleChange}
                  type="password"
                  className="form-control py-2"
                  placeholder="Enter password"
                />
              </div>
              {errors.password1 && (
                <div className="form-text text-danger text-right">
                  {errors.password1}
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
                  name="password2"
                  value={values.password2}
                  onChange={handleChange}
                  className="form-control py-2"
                  placeholder="Enter confirm password"
                />
              </div>
              {errors.password2 && (
                <div className="form-text text-danger text-right">
                  {errors.password2}
                </div>
              )}
            </div>
            <div className="col-lg-7 col-sm-12 mx-auto mb-3">
              <div className="form-group light">
                Already have an account? <Link to="/login">login</Link>
              </div>
              <div className="input-group mx-auto d-block text-right">
                <button
                  type="submit"
                  className="btn-submit btn btn-primary shadow p-2 px-4"
                >
                  Signup
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { register })(Register);
