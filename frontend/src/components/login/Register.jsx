import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../infra/auth";

const Register = ({ toggleIsLogin }) => {
  const [registered, setRegistered] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = async (data) => {
    const response = await registerUser(data).catch((e) => {
      setError("username", { message: e.response.data });
    });
    if (response) setRegistered(true);
  };
  return (
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
        <button onClick={toggleIsLogin}>Back to login</button>
      </div>
    </form>
  );
};

export default Register;
