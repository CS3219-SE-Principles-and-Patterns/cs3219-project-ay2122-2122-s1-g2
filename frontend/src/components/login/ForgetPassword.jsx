import "./Login.css";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../infra/auth";
import { landingEnum } from "../../utils/constants/enums";
import { useState } from "react";

const ForgetPassword = ({ setLandingStatus }) => {
  const [resetted, setResetted] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let response = await resetPassword(data).catch((e) => {
      setError("password", { message: e.response.data });
    });

    if (response) setResetted(true);
  };
  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h1>Forget Password</h1>
      <div className="login-input">
        <label>Username:</label>
        <input {...register("username", { required: true })} />
        {errors.username?.type === "required" && (
          <p className="error-message">Username is required!</p>
        )}
      </div>
      <div className="login-input">
        <label>Password:</label>
        <input {...register("password", { required: true })} />
        {errors.password?.type === "required" && (
          <p className="error-message">Password is required!</p>
        )}
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}
      </div>
      {resetted && (
        <p className="success-message">Successfully reset password!</p>
      )}
      <div className="login-buttons">
        <button type="submit">Reset Password</button>
        <button onClick={() => setLandingStatus(landingEnum.LOGIN)}>
          Login
        </button>
      </div>
    </form>
  );
};

export default ForgetPassword;
