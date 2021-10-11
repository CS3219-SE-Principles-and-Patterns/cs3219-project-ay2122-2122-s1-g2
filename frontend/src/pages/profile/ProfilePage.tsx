import { useState, useEffect } from "react";

import { Box } from "@mui/system";
import {
  Grid,
  Divider,
  LinearProgress,
  Button,
  Typography,
} from "@mui/material";
import LanguageLearnersLogo from "./LanguageLearnersLogo.png";

import { ProfileInfra } from "../../infra/profile";

const ProfileDetails = () => {
  const [hasProfile, setHasProfile] = useState(false);
  const [username, setUsername] = useState("");
  const [langs, setLangs] = useState<string[]>([]);
  const [proficiencies, setProficiencies] = useState<number[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await ProfileInfra.getProfile();
        const profile = res.data.data;
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
    <Box>
      {langs.map((lang, idx) => (
        <Grid container key={lang} sx={{ marginBottom: "2vh" }}>
          <Grid item sm={6} textAlign="left">
            <Typography variant={"h6"} sx={{ marginBottom: "2%" }}>
              {lang}
            </Typography>
          </Grid>
          <Grid item sm={6} textAlign="right">
            <Typography
              variant={"h6"}
              sx={{ marginBottom: "2%", marginRight: "30%" }}
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
    </Box>
  );

  return (
    <Grid item textAlign="left">
      <Box sx={{ width: { sm: "60%" } }}>
        <img
          src={LanguageLearnersLogo}
          alt="LanguageLearnerIcon"
          style={{ width: "100%" }}
        />
      </Box>
      <Typography variant={"h5"} sx={{ marginTop: "3%", marginBottom: "5%" }}>
        {username}
      </Typography>
      <Button
        href="/profile/edit"
        variant="contained"
        sx={{ marginBottom: "10%" }}
      >
        Edit Profile
      </Button>
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
  return (
    <div>
      <Grid item textAlign="left">
        <h2>What is Lorem Ipsum?</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </Grid>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <Box sx={{ flexGrow: 1 }} textAlign="center">
      <Typography variant={"h4"} className="header">
        Language Learners
      </Typography>
      <br />
      <Grid
        container
        spacing={2}
        sx={{ padding: { xs: " 0 4vw", sm: "0 2vw" } }}
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
