import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";

const CreateFlashCard = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/flashcard/create`);
  };
  return (
    <Grid item xs={12} sm={4}>
      <Box
        sx={{
          height: "20vh",
          border: "2px solid #313584",
          backgroundColor: "#ffd8bdff",
          cursor: "pointer",
        }}
        onClick={handleClick}
      ></Box>
    </Grid>
  );
};
export default CreateFlashCard;
