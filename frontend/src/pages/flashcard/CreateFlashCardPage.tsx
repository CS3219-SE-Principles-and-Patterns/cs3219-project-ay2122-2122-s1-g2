import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Stack,
  Typography,
  Grid,
  Switch,
  IconButton,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useForm, Controller } from "react-hook-form";
import { FlashCardController } from "../../controller/FlashCardController";
import { languages } from "../../utils/constants/languages";
import "./CreateFlashCardPage.css";
import {
  CssTextField,
  CssSelect,
  CssSlider,
  CssButton,
} from "../../components/common/Components";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { FlashCardSet, Card } from "../../domain/flashcard";

const CreateFlashCardPage = (props: any) => {
  const { register, handleSubmit, setError, control, setValue, getValues } =
    useForm({});

  const isEdit = props.isEdit;
  const flashcardMsg = isEdit ? "Edit Flashcard Set" : "Create Flashcard Set";
  const { id } = useParams<{ id: string }>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [currCards, setCurrCards] = useState<Array<Card>>([]);
  const [cardIdx, setCardIdx] = useState<number>(-1);
  const [isEnglish, setIsEnglish] = useState(false);
  const successMsg = isEdit ? "Edited Flashcard!" : "Created Flashcard!";

  const onSubmit = async (data: any) => {
    setSuccess(false);
    try {
      if (isEdit) {
        // Updated code for edit below: (not tested if works)
        data.flashcards = currCards;
        data._id = id;
        await FlashCardController.editFlashCard(data);
      } else {
        data.flashcards = currCards;
        await FlashCardController.createFlashCard(data);
      }
      setSuccess(true);
    } catch (e: any) {
      // to test
      setError("notes", { message: e.response.data });
    }
  };

  useEffect(() => {
    const fetchFlashcard = async () => {
      try {
        const flashcard: FlashCardSet = await FlashCardController.getFlashCard(
          id
        );
        setValue("difficulty", flashcard.difficulty);
        setValue("language", flashcard.language);
        setValue("title", flashcard.title);
        setValue("description", flashcard.description);
        setCurrCards(flashcard.flashcards);
        setCardIdx(flashcard.flashcards ? 0 : -1);
        setLoading(false);
      } catch (e) {
        // do nothing
        console.log(e);
      }
    };
    if (isEdit) fetchFlashcard();
  }, [isEdit]);

  const handleLangChange = () => {
    setIsEnglish(!isEnglish);
  };

  const increaseCardIdx = () => {
    const size = currCards.length;
    if (cardIdx < size - 1) setCardIdx(cardIdx + 1);
  };

  const decreaseCardIdx = () => {
    if (cardIdx > 0) setCardIdx(cardIdx - 1);
  };

  const deleteCardAtIdx = () => {
    const res = currCards.filter((elem, idx) => idx !== cardIdx);
    setCurrCards(res);
    setCardIdx(res.length > 0 ? 0 : -1);
    // can't use currCards.length in this case, since it's not updated immediately
  };

  return !isEdit || !isLoading ? (
    <Grid container>
      <Box sx={{ flexGrow: 1, m: 2 }} textAlign="center">
        <h1>{flashcardMsg}</h1>
        <Box
          component="form"
          sx={{
            display: { xs: "flex" },
            justifyContent: "center",
            marginBottom: "5vh",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack className="stack" spacing={2}>
            <FormControl>
              <CssTextField
                required
                label="FlashCard Title"
                {...register("title", { required: true })}
              />
            </FormControl>
            <FormControl>
              <InputLabel id="demo-multiple-chip-label">Language</InputLabel>
              <Controller
                control={control}
                name="language"
                render={({ field: { onChange, value } }) => (
                  <CssSelect
                    required
                    defaultValue={"Korean"}
                    {...register("language", { required: true })}
                    input={<OutlinedInput label="Language" />}
                  >
                    {languages.map((language) => (
                      <MenuItem key={language} value={language}>
                        {language}
                      </MenuItem>
                    ))}
                  </CssSelect>
                )}
              />
            </FormControl>
            <FormControl>
              <CssTextField
                label="Description"
                {...register(`description`)}
                multiline
                rows={2}
                maxRows={4}
              />
            </FormControl>
            <FormControl>
              <Typography textAlign="left" gutterBottom>
                Difficulty
              </Typography>
              <Controller
                control={control}
                name="difficulty"
                defaultValue={1}
                render={({ field: { onChange, value } }) => (
                  <CssSlider
                    aria-label="Difficulty"
                    step={1}
                    min={1}
                    max={5}
                    marks
                    valueLabelDisplay="auto"
                    onChange={onChange}
                  />
                )}
              />
            </FormControl>
            <CssButton
              type="submit"
              sx={{ marginTop: "5vh" }}
              variant="outlined"
            >
              {flashcardMsg}
            </CssButton>
            {isSuccess && (
              <Typography sx={{ color: "green" }}>{successMsg}</Typography>
            )}
          </Stack>
        </Box>
        <Divider />
        <Grid container alignItems="center" justifyContent="center">
          <Grid item sm={4}>
            <Stack className="stack" spacing={2}>
              <h2> Add Card to Set </h2>
              <FormControl>
                <CssTextField
                  required
                  label="Text in Language"
                  {...register(`flashcards.${currCards.length}.altText`, {
                    required: true,
                  })}
                />
              </FormControl>
              <FormControl>
                <CssTextField
                  required
                  label="Text in English"
                  {...register(`flashcards.${currCards.length}.body`, {
                    required: true,
                  })}
                />
              </FormControl>
              <FormControl>
                <CssTextField
                  label="Notes"
                  {...register(`flashcards.${currCards.length}.notes`)}
                  multiline
                  rows={2}
                  maxRows={4}
                />
              </FormControl>
              <CssButton
                sx={{ marginTop: "5vh" }}
                variant="outlined"
                onClick={() => {
                  setCurrCards([
                    ...currCards,
                    getValues(`flashcards.${currCards.length}`),
                  ]);
                  setCardIdx(currCards.length);
                }}
              >
                Add Flashcard
              </CssButton>
            </Stack>
          </Grid>

          {currCards.length === 0 ? (
            <></>
          ) : (
            <Grid item sm={6} id="detail-grid">
              <Box className="text-div">
                <Typography className="header">
                  <Grid container>
                    <Grid item xs={6} textAlign="left">
                      <Switch checked={isEnglish} onChange={handleLangChange} />
                      Text in {isEnglish ? "English" : getValues(`language`)}
                    </Grid>
                    <Grid item xs={6} textAlign="right">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={deleteCardAtIdx}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </Typography>
                <Box className="text-box" onClick={handleLangChange}>
                  <Typography className="flashcard-text">
                    {isEnglish
                      ? currCards[cardIdx].body
                      : currCards[cardIdx].altText}
                  </Typography>
                </Box>
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
                  {currCards[cardIdx].notes}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Grid>
  ) : (
    <Typography> Loading...</Typography>
  );
};

export default CreateFlashCardPage;
