import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { removeTokens } from "../../utils/auth/auth";
import { useHistory } from "react-router-dom";

const HomePage = (props: any) => {
  const setIsAuthenticated = props.setIsAuthenticated;
  const history = useHistory();
  const logout = () => {
    removeTokens();
    setIsAuthenticated(false);
    history.push("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }} textAlign="center">
      <h1>Language Learners</h1>
      <img src="Language_learner_logo.jpg" style={{height:"60%", width:"40%"}}/>
      <Typography> 
        Come join us at Language Learners for an interactive adventure in learning your favorite languages 
      </Typography>
      <br/>
      <button onClick={logout}>Logout</button>
    </Box>
  );
};

export default HomePage;
