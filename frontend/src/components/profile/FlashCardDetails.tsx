import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";
import { CssTextField, BoldTypography } from "../common/Components";
import { FlashCardController } from "../../controller/FlashCardController";
import { FlashCard } from "../../domain/flashcard";
import { useHistory } from "react-router-dom";
import CreateFlashCard from "./CreateFlashCard";

const FlashCardDetails = () => {
  const history = useHistory();
  const [sort, setSort] = useState("Date added");
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSort(event.target.value);
  };
  const [flashcards, setFlashcards] = useState<FlashCard[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const cards = await FlashCardController.getAllFlashCards();
        setFlashcards(cards);
      } catch {}
    };
    fetchFlashcards();
    setLoading(false);
  }, []);
  if (loading) return <Typography>Loading...</Typography>;
  const handleClick = (id: string) => {
    history.push(`/flashcard/${id}`);
  };
  const flashcardsList = flashcards.map((flashcard) => {
    return (
      <Grid item xs={12} sm={4}>
        <Box
          sx={{
            height: "20vh",
            backgroundColor: "#313584",
            cursor: "pointer",
          }}
          onClick={() => handleClick(flashcard._id)}
        ></Box>
        <BoldTypography variant="h6" sx={{ margin: "0.8vh 0" }}>
          {flashcard.title}
        </BoldTypography>
        <Typography>{flashcard.language}</Typography>
      </Grid>
    );
  });
  return (
    <>
      <Box sx={{ marginBottom: "2vh" }}>
        <BoldTypography variant={"h5"}>My Flashcards</BoldTypography>
      </Box>
      <Grid container justifyContent={"space-between"}>
        <Grid item>
          <Select value={sort} onChange={handleChange}>
            <MenuItem value={"Date added"}>Date added</MenuItem>
            <MenuItem value={"Alphabetical"}>Alphabetical</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <CssTextField label="Search"></CssTextField>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "2vh",
          height: "80vh",
          overflow: "auto",
        }}
      >
        <CreateFlashCard />
        {flashcardsList}
      </Grid>
    </>
  );
};

export default FlashCardDetails;
