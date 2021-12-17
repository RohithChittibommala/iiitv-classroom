/* eslint-disable react/prop-types */
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputField from "./InputField";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import api from "../network";
import { useDispatch } from "react-redux";
import { setRole, setUser } from "../state/userSlice";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().label("Password"),
});

const Login = () => {
  const [showPass, setShowPass] = React.useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(api.login, {
    onSuccess: ({ data }) => {
      toast("Login Successful", {
        type: toast.TYPE.SUCCESS,
      });

      dispatch(setUser(data.user));

      localStorage.setItem("classroomToken", data.accessToken);

      if (data?.user.isAdmin) dispatch(setRole("admin"));
      else if (data?.user.isInstructor) dispatch(setRole("instructor"));
      else dispatch(setRole("student"));

      navigate("/");
    },
    onError: (err) => {
      const message = err?.response?.data?.message || "Login Failed";
      toast(message, { type: toast.TYPE.ERROR });
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values) {
    values;
    mutate(values);
    formik.resetForm();
  }

  return (
    <div className="h-full light-blue flex flex-col min-h-screen  flex-grow bg-gray-50 ">
      <div className="w-full max-w-md border-t-4 border-indigo-400 m-auto bg-white rounded-lg  shadow-default py-10 px-8  shadow-md">
        <h1 className="text-3xl font-extrabold text-primary mt-4 mb-6 text-center">
          Log in to your account 🔐
        </h1>
        <InputField
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          error={formik.touched.email && formik.errors.email}
        />
        <InputField
          label="Password"
          type={showPass ? "text" : "password"}
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          error={formik.touched.password && formik.errors.password}
        />

        <div className="flex items-center my-2.5">
          <input
            type="checkbox"
            className="h-4 w-4"
            onChange={() => setShowPass(!showPass)}
          />
          <p className="ml-2">Show Password</p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          onClick={formik.handleSubmit}
          className={`btn ${
            isLoading ? "disabled" : "success-filled"
          } w-full bg-green-400 rounded-md `}
        >
          {isLoading ? "Logging You in ...  " : "Login"}
        </button>

        <div className="text-center my-5">
          <Link to="/forgot_password">
            <h3 className="text-blue-500">Forgotten password</h3>
          </Link>
        </div>
        <div className="mt-3 mx-auto">
          <Link to="/register">
            <button className="button button--aylen px-5 py-3 text-white bg-blue-500 hover:bg-blue-600  relative block focus:outline-none border-2 border-solid rounded-lg text-sm text-center font-semibold uppercase tracking-widest overflow-hidden mx-auto">
              Create New Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div className="h-full flex flex-col min-h-screen  flex-grow bg-gray-50 ">
//       <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-8  shadow-md">
//         <h1 className="text-3xl font-extrabold text-primary mt-4 mb-5 text-center">
//           Log in to your account 🔐
//         </h1>
//         <form onSubmit={handleFormSubmit}>
//           <InputField
//             label="Name"
//             value={formik.values.email}
//             onChange={formik.handleChange("email")}
//           />
//           <InputField
//             label="Password"
//             type="password"
//             value={formik.values.password}
//             onChange={formik.handleChange("password")}
//           />

//           <div className="flex items-center my-2.5">
//             <input type="checkbox" className="h-4 w-4" />
//             <p className="ml-2">Show Password</p>
//           </div>

//           <button
//             className={`bg-green-400 hover:bg-green-600 button--aylen  w-full py-3 px-5 text-sm  font-bold text-center  uppercase tracking-widest    text-white rounded-xl border border-green focus:outline-none focus:border-green-dark `}
//           >
//             Login
//           </button>

//           {/* <div className="text-center my-5">
//             <Link to="/forgot_password">
//               <h3 className="text-blue-500">Forgotten password</h3>
//             </Link>
//           </div> */}
//         </form>
//         <div className="mt-3 mx-auto">
//           {/* <Link to="/register">

//             <button className="button button--aylen px-5 py-3 text-white bg-blue-500 hover:bg-blue-600  relative block focus:outline-none border-2 border-solid rounded-lg text-sm text-center font-semibold uppercase tracking-widest overflow-hidden mx-auto">
//               Create New Account
//             </button>
//           </Link> */}
//         </div>
//       </div>
//     </div>
//   );
// };

export default Login;
