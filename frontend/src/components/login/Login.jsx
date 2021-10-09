import "./Login.css";
import { useForm } from "react-hook-form";
import { loginUser } from "../../infra/auth";
import { landingEnum } from "../../utils/constants/enums";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { getNewAccessToken } from "../../infra/auth";

const Login = ({ setLandingStatus }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [success, setSuccess] = useState(false);

  const setTimeoutAsync = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const silentRefresh = async (expiresIn, refreshToken) => {
    await setTimeoutAsync(expiresIn);
    const response = await getNewAccessToken({ refreshToken: refreshToken });
    if (response) {
      const {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresIn: newExpiresIn,
      } = response.data;
      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      await silentRefresh(newExpiresIn, newRefreshToken);
    }
  };
  const onSubmit = async (data) => {
    let response = await loginUser(data).catch((e) => {
      setError("password", { message: e.response.data });
    });
    if (response) {
      const { accessToken, refreshToken, expiresIn } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      // silentRefresh(expiresIn, refreshToken);
      setSuccess(true);
    }
  };
  return success ? (
    <Redirect to="/home" />
  ) : (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
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
      <div className="login-buttons">
        <button type="submit">Log In</button>
        <button onClick={() => setLandingStatus(landingEnum.REGISTER)}>
          Register
        </button>
        <button onClick={() => setLandingStatus(landingEnum.FORGET_PASSWORD)}>
          Forget Password
        </button>
      </div>
    </form>
  );
};

export default Login;
