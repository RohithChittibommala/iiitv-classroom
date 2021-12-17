import { useFormik } from "formik";
import React from "react";
import ReactDropboxChooser from "react-dropbox-chooser";
import { FiEdit2 } from "react-icons/fi";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import api from "../../network";
import { updateProfilePic } from "../../state/userSlice";
import InputField from "../InputField";

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required().label("Old Password"),
  newPassword: Yup.string().required().min(6).label("New Password"),
  conformNewPassword: Yup.string()
    .required()
    .label("Confirm New Password")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.newPassword === value;
    }),
});

function ProfilePage() {
  const user = useSelector((state) => state.user?.user);

  const { mutate } = useMutation((data) => api.updatePasswrord(data), {
    onSuccess: () => {
      toast.success("Password updated successfully");
    },
  });

  const { mutate: updateProfileImage } = useMutation(
    (data) => api.updateProfileImage(data),
    {
      onSuccess: () => {
        toast.success("Profile picture updated successfully");
      },
    }
  );

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      conformNewPassword: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values) {
    mutate(values);
  }

  const handleProfilePicChange = (file) => {
    const imageUrl = file.link.replace("www.", "dl.");
    updateProfileImage({ imageUrl });
    dispatch(updateProfilePic(imageUrl));
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-18">
      <div className="md:w-3/4 mx-auto p-5 ">
        <div className=" flex items-center   space-x-9 md:w-2/4 md:mx-auto  p-5 mt-16">
          <div className="relative">
            <img
              datatype="image/png"
              src={user.imageUrl}
              className="rounded-full md:w-32 shadow-md"
            />
            <ReactDropboxChooser
              extensions={[".jpeg", ".png", ".jpg"]}
              appKey={import.meta.env.VITE_DROP_BOX_KEY}
              success={(files) => handleProfilePicChange(files[0])}
            >
              <FiEdit2 className="bg-gray-600 top-2 cursor-pointer rounded-full w-8 h-8 p-2 absolute text-white" />
            </ReactDropboxChooser>
          </div>
          <div>
            <h3 className="text-3xl font-bold">{user.name}</h3>
            <p className="text-gray-400 mt-1">{user.email}</p>
          </div>
        </div>

        <div className="md:w-1/3 my-3">
          <h1>Update password</h1>

          <InputField
            label="Old Password"
            type="password"
            value={formik.values.oldPassword}
            onChange={formik.handleChange("oldPassword")}
          />

          <InputField
            label="New Password"
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange("newPassword")}
            error={formik.touched.newPassword && formik.errors.newPassword}
          />

          <InputField
            label="Confirm New Password"
            type="password"
            value={formik.values.conformNewPassword}
            onChange={formik.handleChange("conformNewPassword")}
            error={
              formik.touched.conformNewPassword &&
              formik.errors.conformNewPassword
            }
          />

          <button
            className="btn primary mt-2"
            type="button"
            onClick={formik.handleSubmit}
          >
            change password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
