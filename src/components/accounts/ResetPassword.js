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
    }
  }, [errors]);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
    
          <form
            className="background-form"
            onSubmit={handleSubmit}
            autoComplete="off"
            >
              <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-7 mx-auto d-block">
            <h5>RESET PASSWORD</h5>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-at"></i>
                </span>
                <input
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className={`${errors.email && "inputError "} form-control`}
                  placeholder="Enter Email"
                />
              </div>
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>

            <div className="col-xs-12 col-sm-12 col-md-7 mx-auto d-block">
            <button
              type="submit"
              className="btn btn-outline-success form-control shadow-lg"
            >
              Reset
            </button>
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
