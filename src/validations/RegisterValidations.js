export default function RegisterValidate(values) {
  let errors = {};
  // Register Validation

  if (!values.email) {
    errors.email = "Email is required";
  } else if (
    !/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]/.test(values.email)
  ) {
    errors.email = "Invalid email";
  } else if (!values.password1) {
    errors.password1 = "Password is required";
  } else if (values.password1.length < 8) {
    errors.password1 =
      "Minimum length of the password must be equal or greater than 8 characters";
  } else if (!values.password2) {
    errors.password2 = "Confirm Password is required";
  } else if (values.password1 !== values.password2) {
    errors.password2 = "Password and Confirm Password does not match";
  }
  return errors;
}
