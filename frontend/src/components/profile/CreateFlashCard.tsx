import { Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

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
          justifyContent: "center",
          display: "flex",
        }}
        onClick={handleClick}
      >
        <IconButton color="primary" aria-label="Back">
          <AddIcon fontSize="large" sx={{ fill: "#313584" }} />
        </IconButton>
      </Box>
    </Grid>
  );
};
export default CreateFlashCard;
