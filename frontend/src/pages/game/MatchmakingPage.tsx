import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { gameState } from "../../utils/constants/enums";
//import { CssButton } from "../common/Components";

const MatchmakingPage = (props: any) => {
  return (
    <Box sx={{ flexGrow: 1 }} textAlign="center">
      <Typography>Finding Opponent......</Typography>
    </Box>
  );
};

export default MatchmakingPage;
