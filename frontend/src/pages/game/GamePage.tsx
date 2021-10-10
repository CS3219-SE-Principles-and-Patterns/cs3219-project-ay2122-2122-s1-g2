import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import socketClient from "socket.io-client";

const GamePage = (props: any) => {
    const [question, setQuestion] = useState<string>("Not yet");
    const [answer, setAnswer] = useState<string>("");
    const [answers, setAnswers] = useState<string[]>([]);
    const socket = props.socket;
    useEffect(() => {
        socket.on("flashcard", (data: any) => {
            setQuestion(data.question);
            setAnswer(data.answers);
            console.log(data)
        })
    }, [])

    const handleSubmit = (event: any) => {
        socket.emit(socket.room_id, answer);
        handleQuestionChange();
    }

    const handleQuestionChange = () => {
        socket.on("flashcard", (data: any) => {
            setQuestion(data.question);
            setAnswers(data.answers);
            console.log(data)
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
