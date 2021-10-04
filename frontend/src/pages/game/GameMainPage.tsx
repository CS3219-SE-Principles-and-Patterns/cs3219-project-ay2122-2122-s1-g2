import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { gameState } from "../../utils/constants/enums";
import { CssButton } from "../common/Components";
import GameDefaultPage from "./GameDefaultPage";
import MatchmakingPage from "./MatchmakingPage";
import GamePage from "./GamePage";
import GameEndPage from "./GameEndPage";

const GameMainPage = (props: any) => {
  const findOpponent = () => {
    console.log("Finding opponent...");
  };
  const [status, setStatus] = useState<gameState>(gameState.DEFAULT);

  return (
    <Box sx={{ flexGrow: 1 }} textAlign="center">
      <Typography variant="h2">Game</Typography>
      {status === gameState.DEFAULT ? (
        <GameDefaultPage findOpponent={findOpponent} />
      ) : status === gameState.FINDING_OPPPONENT ? (
        <MatchmakingPage />
      ) : status === gameState.IN_PROGRESS ? (
        <GamePage />
      ) : status === gameState.FINISH ? (
        <GameEndPage />
      ) : (
        <p>Error</p>
      )}
    </Box>
  );
};

export default GameMainPage;
