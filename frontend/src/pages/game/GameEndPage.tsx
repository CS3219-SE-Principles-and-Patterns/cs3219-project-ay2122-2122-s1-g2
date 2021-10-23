import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { gameState } from "../../utils/constants/enums";

const GameEndPage = (props: any) => {
  const handleChange = () => {
    props.setStatus(gameState.DEFAULT);
  }  
  return (
    <Box sx={{ flexGrow: 1 }} textAlign="center">
      <Typography>Game over</Typography>
      <Typography> You scored {props.score} !!!</Typography>
      {
        props.result ? (
          <div>
          <Typography> You won!!! </Typography>
          <Button onClick={handleChange}> Keep that streak going? </Button>
          </div>
        ) : (
          <div>
          <Typography> You lost :-( </Typography>
          <Button onClick={handleChange}> Play again? </Button>
          </div>
        )
      }
      
    </Box>
  );
};

export default GameEndPage;
