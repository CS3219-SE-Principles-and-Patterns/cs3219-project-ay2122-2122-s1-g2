import { Typography } from "@mui/material";
import { useEffect } from "react";
const OpponentFoundPage = ({ startGame }: any) => {
  useEffect(() => {
    const redirect = () => {
      setTimeout(startGame, 1000);
    };
    redirect();
  });
  return <Typography variant="h4">Opponent Found</Typography>;
};
export default OpponentFoundPage;
