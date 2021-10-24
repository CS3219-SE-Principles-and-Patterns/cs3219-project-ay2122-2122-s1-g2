import {
  Grid,
  Typography,
  Switch,
  LinearProgress,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link, useParams, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { FlashCardController } from "../../controller/FlashCardController";
import { FlashCardSet, Card } from "../../domain/flashcard";
import "./FlashCardDetailPage.scss";
import { CssButton } from "../../components/common/Components";

const FlashCardDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [flashcard, setFlashcard] = useState<FlashCardSet>();
  const [cards, setCards] = useState<Array<Card>>();
  const [cardIdx, setCardIdx] = useState<number>(0);
  const [cardSize, setCardSize] = useState<number>(0);
  const [isEnglish, setIsEnglish] = useState(false);
  const [hasDelete, setDelete] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getFlashCard = async () => {
      const flashCardSet = await FlashCardController.getFlashCard(id);
      setFlashcard(flashCardSet);
      setCards(flashCardSet.flashcards);
      setCardSize(flashCardSet.flashcards.length);
    };
    getFlashCard();
    console.log(flashcard);
  }, [id]);

  const handleLangChange = () => {
    setIsEnglish(!isEnglish);
  };

  const increaseCardIdx = () => {
    if (cardIdx < cardSize - 1) setCardIdx(cardIdx + 1);
  };

  const decreaseCardIdx = () => {
    if (cardIdx > 0) setCardIdx(cardIdx - 1);
  };

  const deleteFlashcard = async () => {
    try {
      await FlashCardController.deleteFlashCard(id);
      setDelete(true);
    } catch (e: any) {
      // double check
      setError(e.message);
    }
  };

  return hasDelete ? (
    <Redirect to="/profile" />
  ) : (
    <Grid container>
      {flashcard ? (
        <>
          <Grid item xs={12} sm={4}>
            <Grid className="title-grid">
              <Box className="img-box" />
              <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
                {flashcard.title}
              </Typography>
              <Typography>{flashcard.language}</Typography>
              <Grid container sx={{ marginTop: "3vh", marginBottom: "1vh" }}>
                <Grid item xs={6}>
                  <Typography variant="h6">Difficulty:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="h6"
                    textAlign="right"
                    sx={{ marginRight: { xs: "0", sm: "80%" } }}
                  >
                    {flashcard.difficulty}
                  </Typography>
                </Grid>
              </Grid>
              <LinearProgress
                variant="determinate"
                value={flashcard.difficulty * 20}
                color="inherit"
                sx={{ width: { xs: "100%", sm: "60%" } }}
              />
              <Box
                className="buttons-box"
                sx={{ width: { xs: "50%", sm: "60%" } }}
              >
                <CssButton variant="outlined" href={`/flashcard/edit/${id}`}>
                  Edit
                </CssButton>

                <CssButton variant="outlined" onClick={deleteFlashcard}>
                  Delete
                </CssButton>
                {error && <Typography>{error}</Typography>}
              </Box>
              <Box className="notes-box">
                <Typography className="header">Description: </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: "3.8vw", sm: "15px" } }}
                >
                  {flashcard.description}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={8} id="detail-grid">
            <Box className="text-div">
              <Grid item xs={12}>
                <Typography className="header">
                  Text in {isEnglish ? "English" : flashcard.language}
                  <Switch
                    checked={isEnglish}
                    onChange={handleLangChange}
                    defaultChecked
                  />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box className="text-box">
                  <Typography className="flashcard-text">
                    {isEnglish
                      ? cards
                        ? cards[cardIdx].body
                        : ""
                      : cards
                      ? cards[cardIdx].altText
                      : ""}
                  </Typography>
                </Box>
              </Grid>
              <Grid container>
                <Grid item xs={6} textAlign="left">
                  <IconButton
                    color="primary"
                    aria-label="Back"
                    onClick={decreaseCardIdx}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <IconButton
                    color="primary"
                    aria-label="Forward"
                    onClick={increaseCardIdx}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </Grid>
              </Grid>

              <Typography className="header">Notes: </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: { xs: "3.8vw", sm: "15px" } }}
              >
                {cards ? cards[cardIdx].notes : ""}
              </Typography>
            </Box>
          </Grid>
        </>
      ) : (
        <Typography>Loading....</Typography>
      )}
    </Grid>
  );
};

export default FlashCardDetailPage;
