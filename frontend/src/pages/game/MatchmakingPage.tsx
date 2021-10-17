import { Button, Typography, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { gameState } from "../../utils/constants/enums";
//import { CssButton } from "../common/Components";

const MatchmakingPage = (props: any) => {
  return (
    <Box sx={{ flexGrow: 1 }} textAlign="center">
      <CircularProgress />
      <Typography>Finding you a worthy opponent</Typography>
    </Box>
  );
};

export default MatchmakingPage;
