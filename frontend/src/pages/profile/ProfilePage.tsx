import { Box } from "@mui/system";
import { Grid } from "@mui/material";

import "./ProfilePage.scss";
import ProfileDetails from "../../components/profile/ProfileDetails";
import FlashCardDetails from "../../components/profile/FlashCardDetails";

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
