import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { FlashCardController } from "../../controller/FlashCardController";
import { languages } from "../../utils/constants/languages";
import "./CreateFlashCardPage.css";

const CreateFlashCardPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm();

  //   "flashcard": {
  //     "body": "Hi",
  //     "altText: "Anneyong",
  //     "difficulty": 3,
  //     "language": "Korean",
  //     "title": "Hello world!"
  // }

  const onSubmit = async (data: any) => {
    try {
      await FlashCardController.createFlashCard(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} textAlign="center">
      <h1>Create FlashCard</h1>
      <Box
        component="form"
        display="flex"
        justifyContent="center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack className="stack" spacing={2}>
          <FormControl>
            <TextField
              required
              label="FlashCard Title"
              {...register("title", { required: true })}
            />
          </FormControl>
          <FormControl>
            <InputLabel id="demo-multiple-chip-label">Language</InputLabel>
            <Select
              required
              onChange={() => console.log("hi")}
              input={<OutlinedInput label="Difficulty" />}
            >
              {languages.map((language) => (
                <MenuItem key={language} value={language}>
                  {language}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <TextField
              required
              label="Text in Language"
              {...register("altText", { required: true })}
            />
          </FormControl>
          <FormControl>
            <TextField
              required
              label="Text in English"
              {...register("body", { required: true })}
            />
          </FormControl>
          <FormControl>
            <TextField
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
                <Slider
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

          <Button type="submit" sx={{ marginTop: "5vh" }} variant="contained">
            Create FlashCard
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CreateFlashCardPage;
