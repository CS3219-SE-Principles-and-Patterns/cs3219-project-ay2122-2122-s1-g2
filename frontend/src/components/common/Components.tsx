import { Button, Select, Slider, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#313584",
  },

  "& .MuiInput-underline:after": {
    borderBottomColor: "#313584;",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#313584",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#313584",
    },
  },
});

export const CssSelect = styled(Select)({
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#313584",
  },

  textAlign: "left",
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #313584",
    borderRadius: "5px 5px 0 0",
  },
});

export const CssSlider = styled(Slider)({
  color: "#313584",
  marginTop: "30px",
  "& .MuiSlider-valueLabel": {
    fontWeight: "normal",
    top: -6,
    backgroundColor: "white",
    color: "#313584",
  },
});

export const CssButton = styled(Button)({
  borderColor: "#313584",
  color: "#313584",
  fontFamily: "Open Sans",
  fontWeight: "bold",
  padding: "10px",
});

export const BoldTypography = styled(Typography)({
  fontWeight: "bold",
});
