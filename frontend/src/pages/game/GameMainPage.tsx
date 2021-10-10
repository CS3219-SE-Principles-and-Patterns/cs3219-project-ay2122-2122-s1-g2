import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { gameState } from "../../utils/constants/enums";
import { CssButton } from "../common/Components";
import GameDefaultPage from "./GameDefaultPage";
import MatchmakingPage from "./MatchmakingPage";
import GameUserRecord from "./GameUserRecord";
import GameEndPage from "./GameEndPage";
import GamePage from "./GamePage";
import socketClient from "socket.io-client";

const SERVER: string = "http://localhost:4000/";

const socket: any = socketClient(SERVER);

const GameMainPage = (props: any) => {
  const findOpponent = () => {
    console.log("Finding opponent...");
    setStatus(gameState.FINDING_OPPPONENT);
    socket.emit('Match Player', {username: `Ambrose${Math.random()}`, language: "Korean"}); // i apologize for this will fix later
    socket.on("match found", () => {
      setStatus(gameState.IN_PROGRESS);
    })
    socket.on("no match found", () => {
      setStatus(gameState.DEFAULT);
    })
  };

  const [status, setStatus] = useState<gameState>(gameState.DEFAULT);

  return (
    <Box sx={{ flexGrow: 1 }} textAlign="center">
      <Typography variant="h2">Game</Typography>
      {status === gameState.DEFAULT ? (
        <GameDefaultPage findOpponent={findOpponent} />
      ) : status === gameState.FINDING_OPPPONENT ? (
        <MatchmakingPage/>
      ) : status === gameState.IN_PROGRESS ? (
        <GamePage socket={socket}/>
      ) : status === gameState.FINISH ? (
        <GameEndPage />
      ) : (
        <p>Error</p>
      )}
    </Box>
  );
};

export default GameMainPage;
