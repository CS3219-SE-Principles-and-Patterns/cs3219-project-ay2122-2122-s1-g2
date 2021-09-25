import "./Login.css";
import { useForm } from "react-hook-form";
import { loginUser } from "../../infra/auth";
import { login } from "../../utils/auth/auth";
import { landingEnum } from "../../utils/constants/enums";

const Login = ({ setLandingStatus }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let response = await loginUser(data).catch((e) => {
      setError("password", { message: e.response.data });
    });

    if (response) login(response.data.accessToken);
  };
  return (
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
