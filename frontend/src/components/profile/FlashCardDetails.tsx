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
import { ProfileController } from "../../controller/ProfileController";
import { FlashCardSet } from "../../domain/flashcard";
import { useHistory } from "react-router-dom";
import CreateFlashCard from "./CreateFlashCard";

const FlashCardDetails = () => {
  enum SortEnum {
    DATE = "date",
    ALPHABETICAL = "alphabetical",
  }
  const history = useHistory();
  const [sort, setSort] = useState<string>(SortEnum.DATE);
  const [search, setSearch] = useState("");

  const searchFlashcard = (e: any) => {
    setSearch(e.target.value);
    setShownFlashcards(
      flashcards.filter((flashcard) =>
        flashcard.title.toLowerCase().startsWith(e.target.value.toLowerCase())
      )
    );
  };
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSort(event.target.value);
    console.log(event.target.value);
    if (event.target.value == SortEnum.ALPHABETICAL) {
      setShownFlashcards(
        shownFlashcards.sort((a, b) =>
          a.title.toLowerCase() <= b.title.toLowerCase() ? -1 : 1
        )
      );
    } else {
      setShownFlashcards(
        shownFlashcards.sort((a, b) => (a.dateCreated > b.dateCreated ? -1 : 1))
      );
    }
  };
  const [shownFlashcards, setShownFlashcards] = useState<FlashCardSet[]>([]);
  const [flashcards, setFlashcards] = useState<FlashCardSet[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        var userCards = await FlashCardController.getAllFlashCards();

        var cards: FlashCardSet[] = [];
        const profile = await ProfileController.getProfile();
        const languages = profile.languages;
        // Somehow foreach doesn't work here
        for (var i = 0; i < languages.length; i++) {
          const defaultCard = await FlashCardController.getDefaultFlashCards(
            languages[i]
          );
          cards = cards.concat(defaultCard);
        }
        cards = cards.concat(userCards);

        setFlashcards(cards);

        setShownFlashcards(
          cards.sort((a, b) => (a.dateCreated > b.dateCreated ? -1 : 1))
        );
      } catch {}
    };
    fetchFlashcards();
    setLoading(false);
  }, []);
  if (loading) return <Typography>Loading...</Typography>;
  const handleClick = (id: string) => {
    history.push(`/flashcard/${id}`);
  };
  const flashcardsList = shownFlashcards.map((flashcard) => {
    return (
      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          marginBottom: {
            xs: "4vh",
          },
        }}
      >
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
            <MenuItem value={SortEnum.DATE}>Date added</MenuItem>
            <MenuItem value={SortEnum.ALPHABETICAL}>Alphabetical</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <CssTextField
            label="Search"
            value={search}
            onChange={searchFlashcard}
          ></CssTextField>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "2vh",
          height: "65vh",
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
