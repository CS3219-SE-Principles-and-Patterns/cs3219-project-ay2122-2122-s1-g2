import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Box sx={{ flexGrow: 1 }} textAlign="center">
      <h1>Language Learners</h1>
      <img src="Language_learner_logo.jpg" style={{height:"60%", width:"40%"}}/>
      <Typography> 
        Come join us at Language Learners for an interactive adventure in learning your favorite languages 
      </Typography>
    </Box>
  );
};

export default HomePage;
