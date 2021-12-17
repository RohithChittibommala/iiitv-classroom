import React from "react";
import Dialog from "./Modal";
import { toast } from "react-toastify";
import InputField from "../components/InputField";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import api from "../network";
import { useDispatch } from "react-redux";
import { addAnnouncement } from "../state/courseDetails.slice";

const validationSchema = Yup.object().shape({
  text: Yup.string().required().label("body of announcement"),
});

function CreateAnnouncement({ courseCode, courseId }) {
  const [showModal, setShowModal] = React.useState(false);

  const dispatch = useDispatch();

  const { mutate } = useMutation((data) => api.createAnnouncement(data), {
    onSuccess: ({ data }) => {
      const { announcement } = data;

      dispatch(addAnnouncement({ id: courseId, announcement }));

      toast.success("Announcement created successfully");
    },
  });

  const formik = useFormik({
    initialValues: { text: "" },
    validationSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values) {
    mutate({ ...values, courseCode });
    setShowModal(false);
    formik.resetForm();
  }

  return (
    <>
      <button
        className="btn success mr-2 uppercase text-sm"
        onClick={() => setShowModal(true)}
      >
        Create Announcement
      </button>

      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <InputField
          value={formik.values.text}
          multiline
          placeholder="Announcement goes here ...."
          onChange={formik.handleChange("text")}
          error={formik.touched.text ? formik.errors.text : ""}
          label="Announcement"
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

export default CreateAnnouncement;
