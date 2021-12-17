import { useState } from "react";
import { toast } from "react-toastify";
import ToastMessage from "../components/Notify";
import api from "../network";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(false);

  const handleClick = () => {
    if (email.length === 0) return toast.error("no email provided");

    const data = {
      email,
    };

    api
      .forgotPassword(data)
      .then((res) => {
        toast.success("check your email for instructions");
        setDisable(true);
      })
      .catch((er) => er);
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="md:w-80 p-4">
        <label className="block my-4 text-lg font-semibold text-gray-500">
          Enter your Email address
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none border border-gray-300 p-3 inline-block w-full rounded "
          placeholder="enter your email address"
        />

        <button
          onClick={handleClick}
          disabled={disable}
          className={`px-4 py-2 capitalize  transition duration-300 my-4 bg-green-400 hover:bg-green-500 hover:scale-105 transform hover:-translate-y-1 rounded text-white font-semibold outline-none ${
            disable ? "cursor-not-allowed" : ""
          }`}
        >
          submit
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
