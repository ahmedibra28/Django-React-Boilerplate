export default function ChangePasswordValidate(values) {
  let errors = {};
  // Change Password Validation
if (!values.new_password1) {
    errors.new_password1 = "Password is required";
  } else if (values.new_password1.length < 8) {
    errors.new_password1 =
      "Minimum length of the password must be equal or greater than 8 characters";
  } else if (!values.new_password2) {
    errors.new_password2 = "Confirm Password is required";
  } else if (values.new_password1 !== values.new_password2) {
    errors.new_password2 = "Password and Confirm Password does not match";
  }
  return errors;
}
