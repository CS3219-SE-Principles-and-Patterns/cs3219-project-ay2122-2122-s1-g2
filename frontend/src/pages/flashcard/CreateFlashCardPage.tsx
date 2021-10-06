import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  Stack,
  Typography,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { FlashCardController } from "../../controller/FlashCardController";
import { languages } from "../../utils/constants/languages";
import "./CreateFlashCardPage.css";
import {
  CssTextField,
  CssSelect,
  CssSlider,
  CssButton,
} from "../common/Components";
import { useParams } from "react-router";
import { useEffect } from "react";

const CreateFlashCardPage = (props: any) => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  const isEdit = props.isEdit;
  const flashcardMsg = isEdit ? "Edit Flashcard" : "Create Flashcard";
  const { id } = useParams<{ id: string }>();
  //   "flashcard": {
  //     "body": "Hi",
  //     "altText: "Anneyong",
  //     "difficulty": 3,
  //     "language": "Korean",
  //     "title": "Hello world!"
  // }

  const onSubmit = async (data: any) => {
    try {
      if (isEdit) {
        await FlashCardController.editFlashCard(data, id);
      } else {
        await FlashCardController.createFlashCard(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchFlashcard = async () => {
      try {
        // const flashcard: Flashcard = await FlashCardController.getFlashcard();

        const flashcard = {
          body: "Hi",
          altText: "Anneyong",
          difficulty: 3,
          language: "Japanese",
          title: "Hello world!",
        };
        setValue("body", flashcard.body);
        setValue("altText", flashcard.altText);
        setValue("difficulty", flashcard.difficulty);

        setValue("language", {
          key: flashcard.language,
          value: flashcard.language,
        });
        setValue("title", flashcard.title);
      } catch (e) {
        // do nothing
        console.log(e);
      }
    };
    if (isEdit) fetchFlashcard();
  }, [isEdit]);

  return (
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
                    onChange={onChange}
                    defaultValue={"Korean"}
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
                required
                label="Text in Language"
                {...register("altText", { required: true })}
              />
            </FormControl>
            <FormControl>
              <CssTextField
                required
                label="Text in English"
                {...register("body", { required: true })}
              />
            </FormControl>
            <FormControl>
              <CssTextField
                label="Notes"
                {...register("notes")}
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
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateFlashCardPage;
