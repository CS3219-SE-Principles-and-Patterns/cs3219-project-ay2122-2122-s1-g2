import "./LandingPage.css";
import { useForm } from "react-hook-form";
import { loginUser } from "../infra/auth";
import { login } from "../utils/auth/auth";

const LandingPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // do something
    let response = await loginUser(data).catch((e) => {
      setError("password", { message: e.response.data });
    });

    login(response.data.accessToken);
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <div className="login-input">
          <label>Username:</label>
          <input {...register("username")} />
        </div>
        <div className="login-input">
          <label>Password:</label>
          <input {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LandingPage;
