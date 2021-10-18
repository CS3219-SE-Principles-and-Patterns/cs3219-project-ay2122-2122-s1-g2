import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import "./GamePage.scss";
import { CssButton } from "../../components/common/Components";

const GamePage = (props: any) => {
  const [question, setQuestion] = useState<string>("Not yet");
  const [status, setStatus] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [timing, setTiming] = useState<any>(new Date());
  const socket = props.socket;
  useEffect(() => {
    socket.on("flashcard", (data: any) => {
      setQuestion(data.question);
      setAnswers(data.answers);
      setCorrectAnswer(data.correctAnswer);
      setTiming(new Date());
      setStatus(true);
    });
  }, []);

  const handleSubmit = (event: any) => {
    var currTime: any = new Date();
    var time = Math.abs(currTime - timing);
    var result = event.target.value == correctAnswer;
    socket.emit("answer", { gameRes: result, timing: time }); // idk how to get this timing yet
    handleQuestionChange();
  };

  const handleQuestionChange = () => {
    socket.on("flashcard", (data: any) => {
      setQuestion(data.question);
      setAnswers(data.answers);
      setCorrectAnswer(data.correctAnswer);
    });
  };

  if (status) {
    return (
      <Box sx={{ minWidth: 120, marginTop: "10vh" }}>
        <FormControl sx={{ width: { xs: "80vw", sm: "40vw" } }}>
          <Typography variant="h4">{question}</Typography>
          <Grid container>
            {answers.map((answer: string) => (
              <Grid item xs={5} className="option-box">
                <Button
                  variant="text"
                  className="game-button"
                  onClick={handleSubmit}
                >
                  {answer}
                </Button>
              </Grid>
            ))}
          </Grid>
        </FormControl>
      </Box>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 1 }} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }
};

export default GamePage;
