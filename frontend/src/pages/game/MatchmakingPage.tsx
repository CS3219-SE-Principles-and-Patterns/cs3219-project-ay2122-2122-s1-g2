import { Typography, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const MatchmakingPage = (props: any) => {
  return (
    <Box sx={{ flexGrow: 1 }} textAlign="center">
      <CircularProgress />
      <Typography>Finding you a worthy opponent</Typography>
    </Box>
  );
};

export default MatchmakingPage;
