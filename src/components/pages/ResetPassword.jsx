import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../InputField";
import api from "../network";

const validationSchema = Yup.object().shape({
  password: Yup.string().min(6).required("Password is required"),
  confirmPassword: Yup.string()
    .min(6)
    .required("Confirm Password is required")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

function ResetPassword() {
  const [showPass, setShowPass] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: handlePasswordReset,
  });

  function handlePasswordReset(values) {
    values;

    formik.resetForm();
  }

  return (
    <div className="h-full flex items-center justify-center  bg-blue-50">
      <div className="shadow-lg rounded-2xl bg-white p-6 w-10/12 md:w-4/12">
        <InputField
          label="Password"
          type={showPass ? "text" : "password"}
          className="border-2 border-gray-200 rounded-lg p-2 mb-2 outline-none block  w-full "
          placeholder="Enter your new password minimum length must be 4"
          value={formik.values.password}
          error={formik.touched.password && formik.errors.password}
          onChange={formik.handleChange("password")}
        />

        <InputField
          label="Confirm Password"
          type={showPass ? "text" : "password"}
          className="border-2 border-gray-200 rounded-lg p-2 mb-2 outline-none block  w-full "
          placeholder="Confirm your new password"
          value={formik.values.confirmPassword}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          onChange={formik.handleChange("confirmPassword")}
        />

        <InputField
          type="checkbox"
          className="my-3 block"
          checked={showPass}
          onChange={() => setShowPass(!showPass)}
        />

        <button onClick={formik.handleSubmit} className="btn success">
          submit
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
