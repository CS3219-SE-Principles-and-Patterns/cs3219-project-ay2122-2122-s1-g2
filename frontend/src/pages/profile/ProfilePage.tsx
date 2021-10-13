import { useState, useEffect } from "react";

import { Box } from "@mui/system";
import {
  Grid,
  Divider,
  LinearProgress,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import LanguageLearnersLogo from "./LanguageLearnersLogo.png";
import { CssButton, CssTextField, BoldTypography } from "../common/Components";

import { ProfileController } from "../../controller/ProfileController";
import { FlashCardController } from "../../controller/FlashCardController";
import { FlashCard } from "../../domain/flashcard";
import "./ProfilePage.scss";

const ProfileDetails = () => {
  const [hasProfile, setHasProfile] = useState(false);
  const [username, setUsername] = useState("");
  const [langs, setLangs] = useState<string[]>([]);
  const [proficiencies, setProficiencies] = useState<number[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await ProfileController.getProfile();
        setUsername(profile.username);
        setLangs(profile.languages);
        setProficiencies(profile.proficiencies);
        setHasProfile(true);
      } catch (e) {
        console.log(e);
      }
    };
    if (!hasProfile) fetchProfile();
  }, [hasProfile]);

  const GetProficiencies = () => (
    <>
      {langs.map((lang, idx) => (
        <Grid container key={lang} sx={{ marginBottom: "2vh" }}>
          <Grid item xs={6} textAlign="left">
            <Typography variant={"h6"} sx={{ marginBottom: "2%" }}>
              {lang}
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography
              variant={"h6"}
              sx={{ marginBottom: "2%", marginRight: { sm: "30%" } }}
            >
              {proficiencies[idx]}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <LinearProgress
              variant="determinate"
              value={proficiencies[idx] * 20}
              color="inherit"
              sx={{
                marginRight: { sm: "15%" },
              }}
            />
          </Grid>
        </Grid>
      ))}
    </>
  );

  return (
    <Grid item textAlign="left" sx={{ margin: "10px" }}>
      <Box sx={{ width: { sm: "30%" } }}>
        <img
          src={LanguageLearnersLogo}
          alt="LanguageLearnerIcon"
          className="profile-image"
        />
      </Box>
      <BoldTypography
        variant={"h5"}
        sx={{ marginTop: "3%", marginBottom: "5%" }}
      >
        {username}
      </BoldTypography>
      <CssButton
        href="/profile/edit"
        variant="outlined"
        sx={{ marginBottom: "10%" }}
      >
        Edit Profile
      </CssButton>
      <Divider
        light
        sx={{
          borderColor: "darkblue",
          marginRight: { sm: "15%" },
        }}
      />
      <Typography variant={"h5"} sx={{ marginTop: "3%", marginBottom: "5%" }}>
        Proficiency
      </Typography>
      <GetProficiencies />
    </Grid>
  );
};

const FlashCardDetails = () => {
  const [sort, setSort] = useState("Date added");
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSort(event.target.value);
  };
  const dummyFlashcard = FlashCard.create({
    username: "",
    title: "",
    language: "",
    body: "",
    altText: "",
    difficulty: 0,
  });
  const [flashcards, setFlashcards] = useState<FlashCard[]>([dummyFlashcard]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const cards = await FlashCardController.getAllFlashCards();
        setFlashcards([...flashcards, ...cards]);
      } catch {}
    };
    fetchFlashcards();
    setLoading(false);
  }, []);
  if (loading) return <Typography>Loading...</Typography>;
  const flashcardsList = flashcards.map((flashcard, index) => {
    return (
      <Grid item xs={12} sm={4}>
        <Box
          sx={{
            height: "20vh",
            border: "2px solid #313584",
            backgroundColor: `${index === 0 ? "#ffd8bdff" : "#313584"}`,
          }}
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
            <MenuItem value={"Date added"}>Date added</MenuItem>
            <MenuItem value={"Alphabetical"}>Alphabetical</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <CssTextField label="Search"></CssTextField>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "2vh",
          height: "80vh",
          overflow: "auto",
        }}
      >
        {flashcardsList}
      </Grid>
    </>
  );
};

const ProfilePage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={6}
        sx={{ padding: { xs: "0 4vw", sm: "4vh 2vw 0 2vw" } }}
      >
        <Grid item xs={12} sm={4}>
          <ProfileDetails />
        </Grid>
        <Grid item xs={12} sm={8}>
          <FlashCardDetails />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
