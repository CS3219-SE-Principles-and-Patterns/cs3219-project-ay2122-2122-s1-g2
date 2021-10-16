import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Stack,
  Typography,
  Grid,
  Switch,
  IconButton
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({});

  const isEdit = props.isEdit;
  const flashcardMsg = isEdit ? "Edit Flashcard" : "Create Flashcard";
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
        // await FlashCardController.editFlashCard(data, id);
        // Updated code for edit below: (not tested if works)
        data.flashcards = currCards;
        data._id = id;
        await FlashCardController.editFlashCard2(data);
      } else {
        data.flashcards = currCards;
        await FlashCardController.createFlashCard2(data);
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
        const flashcard: FlashCardSet = await FlashCardController.getFlashCard2(id);
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
  }

  const increaseCardIdx = () => {
    const size = currCards.length;
    if (cardIdx < size-1) setCardIdx(cardIdx+1);
  }

  const decreaseCardIdx = () => {
    if (cardIdx > 0) setCardIdx(cardIdx-1);
  }

  const deleteCardAtIdx = () => {
    const res = currCards.filter((elem,idx) => idx !== cardIdx);
    setCurrCards(res);
    setCardIdx(res.length > 0 ? 0 : -1); 
    // can't use currCards.length in this case, since it's not updated immediately
  }

  return !isEdit || !isLoading ? (
    <Container>
      <Box sx={{ flexGrow: 1, m: 2 }} textAlign="center">
        <h1>{flashcardMsg}</h1>
        <Box
          component="form"
          display="flex"
          justifyContent="center"
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
            <h2> Add Card to Set </h2>
            <FormControl>
              <CssTextField
                required
                label="Text in Language"
                {...register(`flashcards.${cardIdx}.altText`, { required: false })}
              />
            </FormControl>
            <FormControl>
              <CssTextField
                required
                label="Text in English"
                {...register(`flashcards.${cardIdx}.body`, { required: false })}
              />
            </FormControl>
            <FormControl>
              <CssTextField
                label="Notes"
                {...register(`flashcards.${cardIdx}.notes`)}
                multiline
                rows={2}
                maxRows={4}
              />
            </FormControl>
            <CssButton
              sx={{ marginTop: "5vh" }}
              variant="outlined"
              onClick={() => {
                setCurrCards([...currCards, getValues(`flashcards.${cardIdx}`)])
                setCardIdx(cardIdx+1);
              }}
            >
              Add Flashcard
            </CssButton>
            
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
      </Box>
      {cardIdx < 0 ? <></>: (
            <Grid item xs={12} id="detail-grid">
            <Box className="text-div">
              <Typography className="header">
                <Grid container>
                  <Grid item xs={6} textAlign="left">
                    Text in {isEnglish ? "English" : getValues(`language`)} 
                    <Switch checked={isEnglish} onChange={handleLangChange} />
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Button variant="outlined" color="error" onClick={deleteCardAtIdx}>
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Typography>
              <Box className="text-box">
                <Typography className="flashcard-text">
                  {isEnglish ? currCards[cardIdx].body : currCards[cardIdx].altText }
                </Typography>
              </Box>
              <Grid container>
                <Grid item xs={6} textAlign="left">
                  <IconButton color="primary" aria-label="Back" onClick={decreaseCardIdx}>
                    <ArrowBackIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <IconButton color="primary" aria-label="Forward" onClick={increaseCardIdx}>
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
          </Grid>)}
    </Container>
  ) : (
    <Typography> Loading...</Typography>
  );
};

export default CreateFlashCardPage;
