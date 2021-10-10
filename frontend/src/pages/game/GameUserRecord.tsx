import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Stack,
  Grid
} from "@mui/material";
import { GameUser } from "../../domain/gameUser";
import { GameController } from "../../controller/GameController";

const GameUserRecord = (props: any) => {
  const [ratings, setRatings] = useState<number[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [results, setResults] = useState<boolean[]>([]);
  const [languageHistory, setLanguageHistory] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history: GameUser = await GameController.getUserHistory(props.username);
        setLanguages(history.languages);
        setResults(history.resultHistory);
        setLanguageHistory(history.languageHistory);
        setRatings(history.ratings);
      } catch (e) {
        console.log(e);
      }
    };
    fetchHistory();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }} textAlign="center">
      <h1>Game</h1>
      <Grid container justifyContent="center">
        <Box component="span">
          <Stack>
            <List component="nav">
              {languages.map((language) => {
                <ListItem>
                  <ListItemText inset primary={language}/>
                </ListItem>
              })}
            </List>
            <List component="nav">
              {ratings.map((rating) => {
                <ListItem>
                  <ListItemText inset primary={rating}/>
                </ListItem>
              })}
            </List>
          </Stack>
        </Box>
        <Box component="span">
          <Stack>
            <List component="nav">
              {languageHistory.map((language) => {
                <ListItem>
                  <ListItemText inset primary={language}/>
                </ListItem>
              })}
            </List>
            <List component="nav">
              {results.map((result) => {
                <ListItem>
                  <ListItemText inset primary={result}/>
                </ListItem>
              })}
            </List>
          </Stack>
        </Box>
      </Grid>
    </Box>
  );
};

export default GameUserRecord;
