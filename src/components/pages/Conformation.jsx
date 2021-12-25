import React from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../network";
import DisplayMsg from "../DisplayMessage";
import Loading from "../Loading";

function Conformation() {
  const { token } = useParams();

  const [msg, setMsg] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    verifyUser({ token });
  }, []);

  const { mutate: verifyUser, isLoading } = useMutation(
    (data) => api.verifyUser(data),
    {
      onSuccess: () => {
        toast.success("User verified successfully");
        setMsg("User verified successfully");

        setTimeout(() => navigate("/login"), 3000);
      },
      onError: () => {
        toast.error("User verification failed");
        setMsg("User verification failed");
      },
    }
  );

  if (isLoading) return <Loading />;

  return <DisplayMsg msg={msg} />;
}

export default Conformation;
