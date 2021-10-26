import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const GameEndPage = (props: any) => {
  
  return (
    <Box sx={{ flexGrow: 1 }} textAlign="center">
      <Typography>Game over</Typography>
      {
        props.result ? (
          <Typography> You won!!! </Typography>
        ) : (
          <Typography> You lost :-( </Typography>
        )
      }
    </Box>
  );
};

export default GameEndPage;
