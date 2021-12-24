import { useFormik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import * as Yup from "yup";
import InputField from "../InputField";
import api from "../../network";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
});

function ForgotPassword() {
  const { mutate } = useMutation((data) => api.forgotPassword(data), {
    onSuccess: () => {
      toast.info("instructions sent to your email");
    },
    onError: (err) => {
      const message = err?.response?.data?.message || "Forgot Password Failed";
      toast.error(message);
    },
  });

  function handleSubmit(values) {
    mutate(values);
    formik.resetForm();
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,

    onSubmit: handleSubmit,
  });

  return (
    <div className="h-screen flex items-center justify-center  bg-blue-50">
      <div className="shadow-lg rounded-2xl bg-white p-6 w-10/12 md:w-4/12">
        <h1 className="text-2xl font-bold">Enter your email address</h1>

        <InputField
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          error={formik.touched.email ? formik.errors.email : ""}
        />
        <button onClick={formik.handleSubmit} className="btn success">
          submit
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
