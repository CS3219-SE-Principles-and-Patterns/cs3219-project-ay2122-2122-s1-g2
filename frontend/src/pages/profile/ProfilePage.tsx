import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
const ProfilePage = () => {
  return (
    <Box sx={{ flexGrow: 1 }} textAlign="center">
      <Typography variant="h2">Profile</Typography>
      <Button component={Link} variant="contained" to="/profile/edit">
        Edit Profile
      </Button>
    </Box>
  );
};
export default ProfilePage;
