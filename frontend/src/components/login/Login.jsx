import "./Login.css";
import { useForm } from "react-hook-form";
import { loginUser } from "../../infra/auth";
import { landingEnum } from "../../utils/constants/enums";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { getNewAccessToken } from "../../infra/auth";
import { setTokens } from "../../utils/auth/auth";
import { FormControl, Grid, Typography } from "@mui/material";
import { CssButton, CssTextField } from "../common/Components";
import { Box } from "@mui/system";

const Login = ({ setLandingStatus, setIsAuthenticated }) => {
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
      setTokens(newAccessToken, newRefreshToken);
      await silentRefresh(newExpiresIn, newRefreshToken);
    }
  };
  const onSubmit = async (data) => {
    let response = await loginUser(data).catch((e) => {
      setError("password", { message: e.response.data.error });
    });
    if (response) {
      const { accessToken, refreshToken, expiresIn } = response.data;
      setTokens(accessToken, refreshToken);
      silentRefresh(expiresIn, refreshToken);
      setIsAuthenticated(true);
      setSuccess(true);
    }
  };
  return success ? (
    <Redirect to="/home" />
  ) : (
    <Grid container sx={{ width: "80vw" }}>
      <Grid container sm={6}></Grid>
      <Grid container sm={6}>
        <Grid item xs={5}></Grid>
        <Grid item xs={7}>
          <Typography>
            Don't have an Account?{" "}
            <b onClick={() => setLandingStatus(landingEnum.REGISTER)}>
              Register
            </b>
          </Typography>
        </Grid>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4">Language Learners</Typography>
          <FormControl>
            <CssTextField
              label="Username"
              {...register("username", { required: true })}
            />
            {errors.username?.type === "required" && (
              <p className="error-message">Username is required!</p>
            )}
          </FormControl>
          <FormControl>
            <CssTextField
              label="Password"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <p className="error-message">Password is required!</p>
            )}
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
            <Typography>
              Forget Password?{"  "}
              <b onClick={() => setLandingStatus(landingEnum.FORGET_PASSWORD)}>
                Click Here
              </b>
            </Typography>
          </FormControl>
          <Box flex textAlign="center">
            <CssButton
              variant="outlined"
              type="submit"
              justifySelf="center"
              sx={{ width: "50%" }}
            >
              Log In
            </CssButton>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
