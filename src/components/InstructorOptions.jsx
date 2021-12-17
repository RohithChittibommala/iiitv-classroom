import React from "react";
import { BsPlusLg } from "react-icons/bs";
import Dialog from "../modals/Modal";
import InputField from "./InputField";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import api from "../network";

const courseValidationSchema = Yup.object().shape({
  name: Yup.string().min(3).required().label("Name"),
  description: Yup.string().required().min(30).max(300).label("Description"),
  courseCode: Yup.string()
    .min(5)
    .matches(
      /^[A-Z]{2}[0-9]{3}$/,
      "The first 2 characters must be  capital letters and last 3 must be  numbers"
    )
    .required()
    .label("Course Code"),
});

export const instructorDetailsValidationSchema = Yup.object().shape({
  name: Yup.string().min(3).max(10).required("Name is required").label("Name"), //.max(10)
  email: Yup.string()
    .email("Invalid email address format")
    .required()
    .label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

function InstructorOptions() {
  const [showModal, setShowModal] = React.useState(false);

  const { mutate } = useMutation((values) => api.createCourse(values), {
    onSuccess: () => {
      ("success");
    },
  });

  const formik = useFormik({
    initialValues: { name: "", description: "", courseCode: "" },
    validationSchema: courseValidationSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values) {
    mutate(values);
    setShowModal(false);
    formik.resetForm();
  }

  return (
    <>
      <div className="flex mx-auto mt-5" style={{ width: "94%" }}>
        <button
          className="flex btn primary items-center "
          onClick={() => setShowModal(true)}
        >
          <BsPlusLg className="w-4 h-4 mr-2 font-bold" /> ADD COURSE
        </button>
      </div>

      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <h1 className="text-3xl font-extrabold text-primary mt-4 mb-6 text-center">
          Create Course
        </h1>

        <InputField
          value={formik.values.name}
          onChange={formik.handleChange("name")}
          error={formik.touched.name ? formik.errors.name : ""}
          label="Name"
        />
        <InputField
          value={formik.values.description}
          multiline
          onChange={formik.handleChange("description")}
          error={formik.touched.description ? formik.errors.description : ""}
          label="Description"
        />
        <InputField
          value={formik.values.courseCode}
          onChange={formik.handleChange("courseCode")}
          error={formik.touched.courseCode ? formik.errors.courseCode : ""}
          label="Course Code"
        />

        <button
          className="btn primary"
          type="button"
          onClick={formik.handleSubmit}
        >
          Create
        </button>
      </Dialog>
    </>
  );
}

export default InstructorOptions;
