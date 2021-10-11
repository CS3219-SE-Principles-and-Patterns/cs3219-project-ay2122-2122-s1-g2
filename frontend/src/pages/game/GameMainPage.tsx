import { Box } from "@mui/system";
import { FormControl, InputLabel, Select, MenuItem, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { gameState } from "../../utils/constants/enums";
import { CssButton } from "../common/Components";
import GameDefaultPage from "./GameDefaultPage";
import MatchmakingPage from "./MatchmakingPage";
import GameUserRecord from "./GameUserRecord";
import { Profile } from "../../domain/profile";
import GameEndPage from "./GameEndPage";
import { ProfileController } from "../../controller/ProfileController";
import GamePage from "./GamePage";
import socketClient from "socket.io-client";

const SERVER: string = "http://localhost:4000/";

const socket: any = socketClient(SERVER);

const GameMainPage = (props: any) => {
  const findOpponent = (username: string, language: string) => {
    console.log("Finding opponent...");
    setStatus(gameState.FINDING_OPPPONENT);
    socket.emit('Match Player', {username: username, language: language}); // i apologize for this will fix later
    socket.on("match found", () => {
      setStatus(gameState.IN_PROGRESS);
    })
    socket.on("no match found", () => {
      setStatus(gameState.DEFAULT);
    })
  };
  const [languages, setLanguages] = useState<string[]>([]);
  const [hasProfile, setHasProfile] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("");
  const [status, setStatus] = useState<gameState>(gameState.DEFAULT);
  const [username, setUsername] = useState<string>("")

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile: Profile = await ProfileController.getProfile();
        setLanguages(profile.languages);
        setHasProfile(true)
        setLanguage(profile.languages[0])
        setUsername(profile.username)
      } catch (e) {
        // do nothing
        console.log(e);
      }
    };
    fetchProfile();
  }, [])

  const handleChange = (event: any) => {
    setLanguage(event.target.value);
  }

  return (
    <Box sx={{ flexGrow: 1 }} textAlign="center">
      <Typography variant="h2">Game</Typography>
      <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Choose your battle language</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            label="Language"
            onChange={handleChange}
            >
                {
                    languages.map((lang: string) => 
                        <MenuItem value={lang}>{lang}</MenuItem>
                    )
                }
            </Select>
      </FormControl>
      {status === gameState.DEFAULT ? (
        <GameDefaultPage findOpponent={findOpponent} username={username} language={language}/>
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
