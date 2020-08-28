export default function LoginValidate(values) {
  let errors = {};
  // Login Validation

  if (!values.email) {
    errors.email = "Email is required";
  } else if (
    !/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]/.test(values.email)
  ) {
    errors.email = "Invalid email";
  } else if (!values.password) {
    errors.password = "Password is required";
  }
  return errors;
}
