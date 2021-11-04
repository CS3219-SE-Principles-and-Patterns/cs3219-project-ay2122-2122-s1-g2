import "./Login.css";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../infra/auth";
import { landingEnum } from "../../utils/constants/enums";
import { useState } from "react";
import { Box, FormControl, Grid, Typography } from "@mui/material";
import { CssButton, CssTextField, BoldTypography } from "../common/Components";

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
    <Grid container sx={{ width: "80vw" }}>
      <Grid container sm={6}></Grid>
      <Grid container sm={6}>
        <Grid item xs={9}>
          <BoldTypography
            sx={{ textAlign: "right" }}
            onClick={() => setLandingStatus(landingEnum.LOGIN)}
          >
            Back to Login
          </BoldTypography>
        </Grid>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4">Forget Password</Typography>
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
          </FormControl>
          {resetted && (
            <p className="success-message">Successfully reset password!</p>
          )}
          <Box flex textAlign="center">
            <CssButton
              variant="outlined"
              type="submit"
              justifySelf="center"
              sx={{ width: "50%" }}
            >
              Reset Password
            </CssButton>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
};

export default ForgetPassword;
