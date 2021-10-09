import { Box } from "@mui/system";
import {
  Button,
  Chip,
  FormControl,
  Stack,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Slider,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ProfileController } from "../../controller/ProfileController";
import { Profile } from "../../domain/profile";
import { languages } from "../../utils/constants/languages";
import { CssButton, CssSelect, CssSlider } from "../common/Components";

const CreateProfilePage = (props: any) => {
  const isEdit = props.isEdit;
  const [langs, setLangs] = useState<string[]>([]);
  const [proficiencies, setProficiencies] = useState<number[]>([]);
  const [error, setError] = useState<string>("");
  const profileMsg = isEdit ? "Edit Profile" : "Create Profile";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile: Profile = await ProfileController.getProfile();
        setLangs(profile.languages);
        setProficiencies(profile.proficiencies);
      } catch (e) {
        // do nothing
        console.log(e);
      }
    };
    if (isEdit) fetchProfile();
  }, [isEdit]);

  const handleProficiencyArrChange = (newProficiency: number, idx: number) => {
    setProficiencies(
      proficiencies.map((p, i) => (i === idx ? newProficiency : p))
    );
  };

  const handleLanguageChange = (event: SelectChangeEvent<typeof langs>) => {
    const {
      target: { value },
    } = event;
    setLangs(typeof value === "string" ? value.split(",") : value);
    setProficiencies(Array(value.length).fill(3));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await ProfileController.editProfile({
          languages: langs,
          proficiencies,
        });
      } else {
        await ProfileController.createProfile({
          languages: langs,
          proficiencies,
        });
      }

      setError("");
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }} textAlign="center">
        <h1>{profileMsg}</h1>
        <Grid container justifyContent="center">
          <Box component="form">
            <Stack>
              <FormControl sx={{ m: 1, width: 300, marginBottom: "5vh" }}>
                <InputLabel>Languages</InputLabel>
                <Select
                  multiple
                  required
                  value={langs}
                  onChange={handleLanguageChange}
                  input={<OutlinedInput label="Language" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {languages.map((language) => (
                    <MenuItem key={language} value={language}>
                      {language}
                    </MenuItem>
                  ))}
                </Select>
                {error && (
                  <Typography className="error-message">{error}</Typography>
                )}
              </FormControl>
              {proficiencies.map((proficiency, idx) => (
                <FormControl sx={{ m: 1, width: 300 }} key={idx}>
                  <Typography textAlign="left" gutterBottom>
                    {langs[idx]} Proficiency
                  </Typography>
                  <CssSlider
                    aria-label="Proficiency"
                    value={proficiency}
                    step={1}
                    min={1}
                    max={5}
                    marks
                    valueLabelDisplay="auto"
                    onChange={(event, p) =>
                      handleProficiencyArrChange(p as number, idx)
                    }
                  />
                </FormControl>
              ))}

              <CssButton
                onClick={onSubmit}
                sx={{ marginTop: "5vh" }}
                variant="outlined"
              >
                {profileMsg}
              </CssButton>
            </Stack>
          </Box>
        </Grid>
      </Box>
    </Container>
  );
};

export default CreateProfilePage;
