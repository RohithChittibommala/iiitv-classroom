import React from "react";
import Dialog from "./Modal";
import InputField from "../components/InputField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import * as Yup from "yup";
import DropBoxChooser from "react-dropbox-chooser";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { useMutation } from "react-query";
import api from "../network";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addAssignment } from "../state/courseDetails.slice";

const validationSchema = Yup.object().shape({
  description: Yup.string().required().label("Description"),
  deadline: Yup.date()
    .required()
    .label("Deadline")
    .test("deadline", "Deadline must be altleast 10min", (value) => {
      const diff = (value.getTime() - new Date().getTime()) / 1000;
      return diff > 10 * 60;
    }),
});

function CreateAssignment({ courseId, courseCode }) {
  const [showModal, setShowModal] = React.useState(false);

  const dispatch = useDispatch();

  const [file, setFile] = React.useState();

  const { mutate } = useMutation((data) => api.createAssignment(data), {
    onSuccess: ({ data }) => {
      const { assignment } = data;
      dispatch(addAssignment({ id: courseId, assignment }));
      toast.success("Assignment created successfully");
    },
  });

  const formik = useFormik({
    initialValues: {
      description: "",
      deadline: new Date(Date.now() + 15 * 60 * 1000),
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values) {
    const data = {
      ...values,
      pdf: file?.link,
      courseCode,
    };

    mutate(data);

    setShowModal(false);
    formik.resetForm();
  }

  return (
    <>
      <button
        className="btn success mr-2 uppercase text-sm"
        onClick={() => setShowModal(true)}
      >
        Create Assignment
      </button>

      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => (
              <TextField
                sx={{ mt: 2, mb: 4 }}
                fullWidth
                {...props}
                error={formik.touched.deadline && formik.errors.deadline}
                helperText={formik.touched.deadline && formik.errors.deadline}
              />
            )}
            label="Deadline"
            minDate={new Date(Date.now())}
            inputFormat="dd/MM/yyyy hh:mm a"
            minTime={new Date(Date.now() + 10 * 60)}
            value={formik.values.deadline}
            onChange={(date) =>
              formik.setFieldValue("deadline", new Date(date))
            }
          />
        </LocalizationProvider>
        {file && (
          <div className="my-4 flex items-center justify-between">
            <h3>{file.name}</h3>
            <button onClick={() => setFile(null)} className="btn error">
              Remove
            </button>
          </div>
        )}
        {!file && (
          <DropBoxChooser
            appKey={import.meta.env.VITE_DROP_BOX_KEY}
            success={(files) => setFile(files[0])}
            cancel={() => console.log("cancelled")}
            extensions={[".pdf"]}
            disabled={file}
          >
            <button className=" my-3 border-2 p-2">Upload File</button>
          </DropBoxChooser>
        )}
        <InputField
          value={formik.values.description}
          multiline
          onChange={formik.handleChange("description")}
          placeholder="Description of the assignment ..."
          error={formik.touched.description ? formik.errors.description : ""}
          label="Description"
        />
        <button
          className="btn primary mt-2"
          type="button"
          onClick={formik.handleSubmit}
        >
          Create
        </button>
      </Dialog>
    </>
  );
}

export default CreateAssignment;
