import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../infra/auth";
import { landingEnum } from "../../utils/constants/enums";
import CreateProfilePage from "../../pages/profile/CreateProfilePage";

const Register = ({ setLandingStatus }) => {
  const [registered, setRegistered] = useState(false);
  const [page, setPage] = useState(0);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = async (data) => {
    const response = await registerUser(data).catch((e) => {
      setError("username", { message: e.response.data.error });
    });

    if (response) {
      setRegistered(true);
      setPage(1);
    }
  };
  return page === 0 ? (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h1>Register</h1>
      <div className="login-input">
        <label>Username:</label>
        <input {...register("username", { required: true })} />
        {errors.username?.type === "required" && (
          <p className="error-message">Username is required!</p>
        )}
        {errors.username && (
          <p className="error-message">{errors.username.message}</p>
        )}
      </div>
      <div className="login-input">
        <label>Password:</label>
        <input {...register("password", { required: true })} />
        {errors.password?.type === "required" && (
          <p className="error-message">Password is required!</p>
        )}
      </div>
      <div className="login-input">
        <label>Re-enter Password:</label>
        <input
          {...register("validatePassword", {
            validate: (value) =>
              value === password.current || "The passwords do not match.",
          })}
        />
        {errors.validatePassword && (
          <p className="error-message">{errors.validatePassword.message}</p>
        )}
      </div>
      {registered && (
        <p className="success-message">Successfully registered!</p>
      )}
      <div className="login-buttons">
        <button type="submit">Register</button>
        <button onClick={() => setLandingStatus(landingEnum.LOGIN)}>
          Back to login
        </button>
      </div>
    </form>
  ) : (
    <CreateProfilePage
      username={getValues("username")}
      setLandingStatus={setLandingStatus}
    />
  );
};

export default Register;
