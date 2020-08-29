import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { change_password } from "../../actions/authActions";
import ChangePasswordValidate from "../../validations/ChangePasswordValidations";

const initialValues = {
  new_password1: "",
  new_password2: "",
};
function ChangePassword(props) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSebmitting] = useState(false);

  const { change_password } = props;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(ChangePasswordValidate(values));
    setIsSebmitting(true);
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
     
      change_password(values);
      setValues({
        ...values,
        new_password1: "",
        new_password2: ""
      });
    }
  }, [errors]);

  return (
    <div className="container__body">
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="row">
          
          <h3 className="text-center form-title mb-4">Change Password</h3>
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
                name="new_password1"
                value={values.new_password1}
                onChange={handleChange}
                className="form-control py-2"
                placeholder="Enter new password"
              />
            </div>
            {errors.new_password1 && (
              <div className="form-text text-danger text-right">
                {errors.new_password1}
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
                name="new_password2"
                value={values.new_password2}
                onChange={handleChange}
                className="form-control py-2"
                placeholder="Enter confirm password"
              />
            </div>
            {errors.new_password2 && (
              <div className="form-text text-danger text-right">
                {errors.new_password2}
              </div>
            )}
          </div>

          <div className="col-lg-7 col-sm-12 mx-auto mb-3">
            <div className="input-group mx-auto d-block text-right">
              <button
                type="submit"
                className="btn-submit btn btn-primary shadow p-2 px-4"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

ChangePassword.propTypes = {
  change_password: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { change_password })(ChangePassword);
