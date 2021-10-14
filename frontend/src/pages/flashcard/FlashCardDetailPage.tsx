import { Grid, Typography, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { FlashCardController } from "../../controller/FlashCardController";
import { FlashCard } from "../../domain/flashcard";
import "./FlashCardDetailPage.scss";
import { CssButton } from "../../components/common/Components";

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

  const deleteFlashcard = () => {
    console.log("delte");
  };
  return (
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
              </Box>
              <Box className="notes-box">
                <Typography className="header">Notes: </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: "3.8vw", sm: "15px" } }}
                >
                  {flashcard.notes}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={8} id="detail-grid">
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
