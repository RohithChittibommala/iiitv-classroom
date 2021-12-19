import React from "react";
import { BsPlusLg } from "react-icons/bs";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import api from "../network";
import Dialog from "../modals/Modal";
import InputField from "./InputField";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).required().label("Name"),
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(6).required().label("Password"),
});

function AdminOptions() {
  const [showModal, setShowModal] = React.useState(false);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const { mutate } = useMutation((data) => api.register(data), {
    onSuccess: () => toast.success("instructor created successfully"),
  });

  function handleSubmit(values) {
    const data = { ...values, role: "instructor" };
    mutate(data);
    setShowModal(false);
    formik.resetForm();
  }

  return (
    <>
      <div className="flex mx-auto mt-5" style={{ width: "94%" }}>
        <button
          className="flex transition hover:bg-blue-500 px-4 font-semibold items-center py-2 rounded bg-blue-300 text-white"
          onClick={() => setShowModal(true)}
        >
          <BsPlusLg className="w-4 h-4 mr-2 font-bold" /> ADD INSTRUCTOR
        </button>
      </div>

      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <h1 className="text-2xl font-extrabold text-primary mt-4 mb-6 ">
          Create Instructor
        </h1>

        <InputField
          value={formik.values.name}
          onChange={formik.handleChange("name")}
          error={formik.touched.name ? formik.errors.name : ""}
          label="Name"
        />
        <InputField
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          error={formik.touched.email ? formik.errors.email : ""}
          label="Email"
        />
        <InputField
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          error={formik.touched.password ? formik.errors.password : ""}
          label="Password"
        />

        <button
          className="btn success"
          type="submit"
          onClick={formik.handleSubmit}
        >
          Create
        </button>
      </Dialog>
    </>
  );
}

export default AdminOptions;
