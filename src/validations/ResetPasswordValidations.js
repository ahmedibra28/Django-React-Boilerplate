export default function ResetPasswordValidate(values) {
  let errors = {};
  // Reset Validation

  if (!values.email) {
    errors.email = "Email is required";
  } else if (
    !/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]/.test(values.email)
  ) {
    errors.email = "Invalid email";
  }
  return errors;
}
