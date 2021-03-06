import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { landingEnum } from "../../utils/constants/enums";
import CreateProfilePage from "../../pages/profile/CreateProfilePage";
import { FormControl, Grid, Typography } from "@mui/material";
import { CssButton, CssTextField } from "../common/Components";
import { Box } from "@mui/system";
import { LoginController } from "../../controller/LoginController";

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
    const response = await LoginController.registerUser(data).catch((e) => {
      setError("username", { message: e.response.data.error });
    });

    if (response) {
      setRegistered(true);
      setPage(1);
    }
  };
  return (
    <Grid container sx={{ width: "80vw" }}>
      <Grid container sm={6}>
        <Box sx={{ width: "80%" }}>
          <img src="home_icon2.jpg" style={{ width: "100%" }}></img>
        </Box>
      </Grid>
      {page === 0 ? (
        <Grid container sm={6}>
          <Grid item xs={5}></Grid>
          <Grid item xs={7}>
            <Typography>
              Already have an Account?{" "}
              <b onClick={() => setLandingStatus(landingEnum.LOGIN)}>Login</b>
            </Typography>
          </Grid>
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4">Sign Up</Typography>
            <FormControl>
              <CssTextField
                label="Username"
                {...register("username", { required: true })}
              />
              {errors.username?.type === "required" && (
                <p className="error-message">Username is required!</p>
              )}
              {errors.username && (
                <p className="error-message">{errors.username.message}</p>
              )}
            </FormControl>
            <FormControl>
              <CssTextField
                label="Password"
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password?.type === "required" && (
                <p className="error-message">Password is required!</p>
              )}
            </FormControl>
            <FormControl>
              <CssTextField
                label="Re-enter Password"
                type="password"
                {...register("validatePassword", {
                  validate: (value) =>
                    value === password.current || "The passwords do not match.",
                })}
              />
              {errors.validatePassword && (
                <p className="error-message">
                  {errors.validatePassword.message}
                </p>
              )}
            </FormControl>
            {registered && (
              <p className="success-message">Successfully registered!</p>
            )}
            <Box flex textAlign="center">
              <CssButton
                variant="outlined"
                type="submit"
                justifySelf="center"
                sx={{ width: "50%", marginTop: "20px" }}
              >
                Register
              </CssButton>
            </Box>
          </form>
        </Grid>
      ) : (
        <Grid container sm={6}>
          <CreateProfilePage
            username={getValues("username")}
            setLandingStatus={setLandingStatus}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Register;
