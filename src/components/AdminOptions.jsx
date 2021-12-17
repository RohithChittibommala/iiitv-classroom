import React from "react";
import { BsPlusLg } from "react-icons/bs";
import Dialog from "../modals/Modal";
import InputField from "./InputField";
import * as Yup from "yup";
import { useFormik } from "formik";

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

  function handleSubmit(values) {
    console.trace(values);
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
          multiline
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
