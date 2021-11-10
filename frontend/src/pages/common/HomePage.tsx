import { Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { removeTokens } from "../../utils/auth/auth";
import { useHistory } from "react-router-dom";
import { CssButton, BoldTypography } from "../../components/common/Components";

const HomePage = (props: any) => {
  const setIsAuthenticated = props.setIsAuthenticated;
  const history = useHistory();
  const logout = () => {
    removeTokens();
    setIsAuthenticated(false);
    history.push("/");
  };
  return (
    <Grid container sx={{ margin: { sm: "2vh 3vw" } }}>
      <Grid item xs={6}>
        <BoldTypography sx={{ fontSize: "5vh" }}>
          LANGUAGE LEARNERS
        </BoldTypography>
      </Grid>
      <Grid item xs={6} textAlign="right">
        <CssButton onClick={logout}>Logout</CssButton>
      </Grid>
      <Grid
        container
        item
        xs={12}
        sx={{ marginTop: { xs: "8vh", sm: "20vh" } }}
      >
        <Grid item xs={12} sm={6} sx={{ paddingRight: { sm: "10vw" } }}>
          <BoldTypography
            sx={{ textAlign: { xs: "center", sm: "left" }, fontSize: "4.8vh" }}
          >
            Learn languages with ease
          </BoldTypography>
          <Typography
            sx={{
              marginTop: "2vh",
              fontSize: "4vh",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            Why learn alone when you can learn with others all over the world.
            Learn languages using flashcards and compete with others to help
            each other improve.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} container justifyContent="center">
          <Box sx={{ width: { xs: "80%" }, marginTop: { xs: "4vh", sm: "0" } }}>
            <img src="home_icon1.jpg" style={{ width: "100%" }} />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;
