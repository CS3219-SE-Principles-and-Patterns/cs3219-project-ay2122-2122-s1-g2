import { Box } from "@mui/system";
import Navbar from "../../components/common/Navbar";
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
  Typography,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ProfileController } from "../../controller/ProfileController";
import { Profile } from "../../domain/profile";

const ProfilePage = () => {
  const languages = ["Korean", "Japanese", "French"];
  const [langs, setLangs] = useState<string[]>([]);
  const [proficiency, setProficiency] = useState<number>(3);
  const [error, setError] = useState<string>("");

  const handleProficiencyChange = (
    event: Event,
    newProficiency: number | number[]
  ) => {
    setProficiency(newProficiency as number);
  };

  const handleLanguageChange = (event: SelectChangeEvent<typeof langs>) => {
    const {
      target: { value },
    } = event;
    setLangs(typeof value === "string" ? value.split(",") : value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    try {
      ProfileController.editProfile({ languages: langs, proficiency });
      setError("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile: Profile = await ProfileController.getProfile();
        setLangs(profile.languages);
        setProficiency(profile.proficiency);
      } catch (e) {
        // do nothing
        console.log(e);
      }
    };
    fetchProfile();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }} textAlign="center">
      <h1>Edit Profile</h1>
      <Grid container justifyContent="center">
        <Box component="form">
          <Stack>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">Languages</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                required
                value={langs}
                onChange={handleLanguageChange}
                input={
                  <OutlinedInput id="select-multiple-chip" label="Language" />
                }
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

            <FormControl sx={{ m: 1, width: 300 }}>
              <Typography textAlign="left" gutterBottom>
                Proficiency
              </Typography>
              <Slider
                aria-label="Proficiency"
                value={proficiency}
                step={1}
                min={1}
                max={5}
                marks
                valueLabelDisplay="auto"
                onChange={handleProficiencyChange}
              />
            </FormControl>

            <Button onClick={onSubmit} variant="contained">
              Edit Profile
            </Button>
          </Stack>
        </Box>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
