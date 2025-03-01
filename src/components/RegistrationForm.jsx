import { useDispatch } from "react-redux";
import { register } from "../redux/auth/operations";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

export const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting, setFieldError }) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        console.log("registration success");
      })
      .catch((error) => {
        console.log("registration error:", error);
        setFieldError("email", "Email already in use");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label}>
          Username
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" className={css.error} />
        </label>

        <label className={css.label}>
          Email
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" className={css.error} />
        </label>

        <label className={css.label}>
          Password
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" className={css.error} />
        </label>

        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};
