import * as Yup from "yup";

export const signupValidationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  phoneNumber: Yup.string()
    .matches(
      /^[0-9]{10}$/,
      "Phone number must be 10 digits without spaces or special characters"
    )
    .required("Phone number is required"),
});

export const signinValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
