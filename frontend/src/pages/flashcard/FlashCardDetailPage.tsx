import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { FlashCardController } from "../../controller/FlashCardController";
import { FlashCard } from "../../domain/flashcard";
import "./FlashCardDetailPage.scss";

const FlashCardDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [flashcard, setFlashcard] = useState<FlashCard>();

  useEffect(() => {
    const getFlashCard = async () => {
      const flashcard = await FlashCardController.getFlashCard(id);
      setFlashcard(flashcard);
    };
    getFlashCard();
  }, [id]);

  return (
    <Grid container>
      {flashcard ? (
        <>
          <Grid item sm={4}>
            <Grid className="title-grid">
              <Box className="img-box" />
              <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
                {flashcard.title}
              </Typography>
              <Typography>{flashcard.language}</Typography>
              <Typography sx={{ marginTop: "3vh" }}>
                Difficulty: {flashcard.difficulty}
              </Typography>

              <Box className="notes-box">
                <Typography className="header">Notes: </Typography>
                <Typography sx={{ fontSize: "15px" }}>
                  {flashcard.notes}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item sm={8} id="detail-grid">
            <Box className="text-div">
              <Typography className="header">
                Text in {flashcard.language}
              </Typography>
              <Box className="text-box">
                <Typography className="flashcard-text">
                  {flashcard.altText}
                </Typography>
              </Box>
            </Box>
            <Box className="text-div">
              <Typography className="header">Text in English</Typography>
              <Box className="text-box">
                <Typography className="flashcard-text">
                  {flashcard.body}
                </Typography>
              </Box>
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
