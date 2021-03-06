import { Button, Grid, Typography, FormControl, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import "./GamePage.scss";

const GamePage = (props: any) => {
  const [question, setQuestion] = useState<string>("Not yet");
  const [status, setStatus] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [timing, setTiming] = useState<any>(new Date());
  const [correctNumber, setCorrectNumber] = useState<number>(0);
  const [round, setRound] = useState<number>(0);
  const socket = props.socket;
  useEffect(() => {
    const socketListener = () => {
      socket.on("flashcard", (data: any) => {
        if (data == null){
          return;
        }
        setQuestion(data.question);
        setAnswers(data.answers);
        setCorrectAnswer(data.correctAnswer);
        setTiming(new Date());
        setStatus(true);
      });
    }
    socketListener();
  }, []);

  const handleSubmit = (answer: any) => {
    var currTime: any = new Date();
    var time = Math.abs(currTime - timing);
    var result = answer == correctAnswer;
    socket.emit("answer", { gameRes: result, timing: time });
    if (result) {
      setCorrectNumber(correctNumber + 1);
    }
    setRound(round + 1)
    handleQuestionChange();
  };

  const handleQuestionChange = () => {
    socket.on("flashcard", (data: any) => {
      if (data == null){
        return;
      }
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
                  onClick={() => handleSubmit(answer)}
                >
                  {answer}
                </Button>
              </Grid>
            ))}
          </Grid>
        </FormControl>
        <Typography>You have answered {correctNumber}/{round} questions correctly</Typography>
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
