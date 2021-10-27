import { useState, useEffect } from "react";
import { Grid, Typography, LinearProgress, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { ProfileController } from "../../controller/ProfileController";
import { CssButton, BoldTypography } from "../common/Components";
import LanguageLearnersLogo from "./LanguageLearnersLogo.png";

const ProfileDetails = () => {
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
      } catch (e) {
        console.log(e);
      }
    };
    fetchProfile();
  }, []);

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

export default ProfileDetails;
