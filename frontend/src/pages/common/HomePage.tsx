import { useState, useEffect } from "react";

import { Box } from "@mui/system";
import { Grid, Stack, Divider, LinearProgress, Button } from '@mui/material';
import LanguageLearnersLogo from './LanguageLearnersLogo.png'

import { ProfileInfra } from "../../infra/profile";
import { ProfileController } from "../../controller/ProfileController";

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
        // do nothing
        console.log(e);
      }
    };
    if (!hasProfile) fetchProfile();
  }, [hasProfile])

  const GetProficiencies = () => (
    <div>
      {langs.map((lang,idx)=>(
        <Grid container>
          <Grid item xs={6} textAlign="left">
            <h5 style={{marginBottom: "2%"}}>{lang}</h5>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <h5 style={{marginBottom: "2%", marginRight: "30%"}}>{proficiencies[idx]}</h5>
          </Grid>
          <Grid item xs={12}>
          <LinearProgress 
            variant="determinate" 
            value={proficiencies[idx]*20}
            color='inherit'
            sx={{
              marginRight: "15%",
            }}/>
          </Grid>
        </Grid>
      ))}
    </div>
  )

  return (
      <Grid item textAlign="left">
        <Box>
          <img src={LanguageLearnersLogo} alt="LanguageLearnerIcon" style={{ width: '60%' }}/>
        </Box>
        <h4 style={{marginTop: "3%", marginBottom: "5%"}}>{username}</h4>
        <Button href="/profile/edit" variant="contained" style={{marginBottom: "10%"}}>
          Edit Profile
        </Button>
        <Divider light sx={{
          borderColor: "darkblue",
          marginRight: "15%"
        }}/>
        <h4 style={{marginTop: "3%", marginBottom: "5%"}}>Proficiency</h4>
        <GetProficiencies/>
      </Grid>
  )
}

const FlashCardDetails = () => {
  return (
    <div>
      <Grid item textAlign="left">
      <h2>What is Lorem Ipsum?</h2>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </Grid>
    </div>
  )
}

const HomePage = () => {
  return (
    <Box sx={{ flexGrow: 1 }} textAlign="center" style={{
      marginLeft: '5%'
    }}>
      <h1>Language Learners</h1>
      <br/>
      <Grid container spacing={2}>
        <Grid container xs={4}>
          <ProfileDetails/>
        </Grid>
        <Grid container xs={8}>
          <FlashCardDetails/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
