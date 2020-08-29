import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { reset_password } from "../../actions/authActions";
import ResetPasswordValidate from "../../validations/ResetPasswordValidations";

const initialValues = {
  email: "",
};
function ResetPassword(props) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSebmitting] = useState(false);

  const { isAuthenticated, reset_password } = props;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(ResetPasswordValidate(values));
    setIsSebmitting(true);
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      reset_password(values);
      setValues({
        ...values,
        email: "",
      });
      props.history.push('/login')
    }
  }, [errors]);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (

    <div className="container__body">
      <form onSubmit={handleSubmit} autoComplete="off">

        <div className="row">
      <h3 className="text-center form-title mb-4">Reset Password</h3>
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
            <div className="input-group mx-auto d-block text-right">
              <button
                type="submit"
                className="btn-submit btn btn-primary shadow p-2 px-4"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>


   
  );
}

ResetPassword.propTypes = {
  reset_password: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { reset_password })(ResetPassword);
