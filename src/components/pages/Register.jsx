import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

import * as Yup from "yup";

import InputField from "../InputField";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).max(10).required("Name is required").label("Name"), //.max(10)
  email: Yup.string()
    .email("Invalid email address format")
    .required()
    .label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

const Register = () => {
  const [showPass, setShowPass] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values) {
    values;
    formik.resetForm();
  }

  return (
    <div className="h-screen light-blue items-center flex bg-gray-bg1 flex-grow">
      <div className="w-full  max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-8 shadow-lg">
        <h1 className="text-3xl font-extrabold  mt-4 mb-5 text-center">
          Create an account 👋
        </h1>
        <InputField
          label="Name"
          type={"text"}
          value={formik.values.name}
          onChange={formik.handleChange("name")}
          error={formik.touched.name ? formik.errors.name : ""}
        />

        <InputField
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          error={formik.touched.email ? formik.errors.email : ""}
        />
        <InputField
          label="Password"
          type={showPass ? "text" : "password"}
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          error={formik.touched.password ? formik.errors.password : ""}
        />

        <div className="flex items-center my-2.5">
          <input
            type="checkbox"
            className="h-4 w-4"
            onChange={() => setShowPass(!showPass)}
          />
          <p className="ml-2">Show Password</p>
        </div>

        <div className="flex justify-center items-center mt-6 ">
          <button
            className={"btn success w-full"}
            onClick={formik.handleSubmit}
          >
            Register
          </button>
        </div>

        <div className="text-center my-5 flex justify-center space-x-3">
          <p> Already have accout?</p>
          <Link to="/login">
            <h3 className="text-blue-500">Login</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
