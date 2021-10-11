import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";

const GamePage = (props: any) => {
    const [question, setQuestion] = useState<string>("Not yet");
    const [answer, setAnswer] = useState<string>("");
    const [correctAnswer, setCorrectAnswer] = useState<string>("");
    const [answers, setAnswers] = useState<string[]>([]);
    const [timing, setTiming] = useState<any>(new Date())
    const socket = props.socket;
    useEffect(() => {
        socket.on("flashcard", (data: any) => {
            setQuestion(data.question);
            setAnswers(data.answers);
            setCorrectAnswer(data.correctAnswer);
            setTiming(new Date())
        })
    }, [])

    const handleSubmit = (event: any) => {
        var currTime: any = new Date();
        var time = Math.abs(currTime - timing);
        var result = answer == correctAnswer;
        socket.emit("answer", {gameRes: result, timing: time, } ); // idk how to get this timing yet
        handleQuestionChange();
    }

    const handleQuestionChange = () => {
        socket.on("flashcard", (data: any) => {
            setQuestion(data.question);
            setAnswers(data.answers);
            setCorrectAnswer(data.correctAnswer);
        })
    }

    const handleChange = (event: any) => {
        setAnswer(event.target.value)
    }
    
    return (
        <Box sx={{minWidth: 120}}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{question}</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={answer}
            label="Question"
            onChange={handleChange}
            >
                {
                    answers.map((answer: string) => 
                        <MenuItem value={answer}>{answer}</MenuItem>
                    )
                }
            </Select>
            </FormControl>
            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
    )
}

export default GamePage;
