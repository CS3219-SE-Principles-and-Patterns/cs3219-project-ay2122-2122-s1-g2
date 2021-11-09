import { Box } from "@mui/system";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { gameState } from "../../utils/constants/enums";
import GameDefaultPage from "./GameDefaultPage";
import MatchmakingPage from "./MatchmakingPage";
import { Profile } from "../../domain/profile";
import GameEndPage from "./GameEndPage";
import GameWaitingPage from "./GameWaitingPage";
import { ProfileController } from "../../controller/ProfileController";
import GamePage from "./GamePage";
import socketClient from "socket.io-client";
import OpponentFoundPage from "./OpponentFoundPage";

const SERVER: string = "http://34.126.141.177";

var socket: any = socketClient(SERVER);

const GameMainPage = (props: any) => {
  const findOpponent = (username: string, language: string) => {
    console.log("Finding opponent...");
    setStatus(gameState.FINDING_OPPPONENT);
    socket.emit("Match Player", { username: username, language: language });
    socket.on("match found", () => {
      setStatus(gameState.OPPONENT_FOUND);
    });
    socket.on("no match found", () => {
      setStatus(gameState.DEFAULT);
    });
    socket.on("Player finished", (data: any) => {
      if (data != null) {
        setScore(data.score);
        setResult(data.result);
        setStatus(gameState.WAITING_FOR_FINISH);
        socket.emit("Player finished");
      } else {
        socket.emit("Player finished", { emit: false });
      }
    });
    socket.on("End game", (data: any) => {
      setStatus(gameState.FINISH);
      socket.disconnect();
      socket = socketClient(SERVER);
    });
  };
  const [languages, setLanguages] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>("");
  const [status, setStatus] = useState<gameState>(gameState.DEFAULT);
  const [username, setUsername] = useState<string>("");
  const [result, setResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const startGame = () => setStatus(gameState.IN_PROGRESS);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile: Profile = await ProfileController.getProfile();
        setLanguages(profile.languages);
        setLanguage(profile.languages[0]);
        setUsername(profile.username);
      } catch (e) {
        // do nothing
        console.log(e);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (event: any) => {
    setLanguage(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1, margin: 4 }} textAlign="center">
      <Typography variant="h2">Game</Typography>
      {status === gameState.DEFAULT ? (
        <>
          <FormControl sx={{ width: "50vw", mb: 3, mt: 3 }}>
            <InputLabel id="demo-simple-select-label">
              Choose your battle language
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={language}
              label="Language"
              onChange={handleChange}
            >
              {languages.map((lang: string) => (
                <MenuItem value={lang}>{lang}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <GameDefaultPage
            findOpponent={findOpponent}
            username={username}
            language={language}
          />
        </>
      ) : status === gameState.FINDING_OPPPONENT ? (
        <MatchmakingPage />
      ) : status === gameState.OPPONENT_FOUND ? (
        <OpponentFoundPage startGame={startGame} />
      ) : status === gameState.IN_PROGRESS ? (
        <GamePage socket={socket} />
      ) : status === gameState.WAITING_FOR_FINISH ? (
        <GameWaitingPage />
      ) : status === gameState.FINISH ? (
        <GameEndPage result={result} score={score} setStatus={setStatus} />
      ) : (
        <p>Error</p>
      )}
    </Box>
  );
};

export default GameMainPage;
