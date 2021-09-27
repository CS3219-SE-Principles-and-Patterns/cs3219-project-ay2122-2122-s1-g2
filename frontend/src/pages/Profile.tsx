import { Box } from "@mui/system";
import Navbar from "../components/common/Navbar";

const Profile = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Box sx={{ flexGrow: 1 }} textAlign="center">
        <h1>Profile</h1>
      </Box>
    </Box>
  );
};

export default Profile;
