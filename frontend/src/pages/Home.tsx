import { Button, Drawer, Grid, IconButton, Link } from "@mui/material";
import { Box } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import GameIcon from "@mui/icons-material/SportsEsports";

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Drawer
        variant="persistent"
        anchor="left"
        open={true}
        sx={{ width: 300 }}
      >
        <Grid
          container
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
          spacing={{ xs: 2, md: 3 }}
        >
          <Grid item textAlign="center">
            <Box sx={{ width: 50, height: 50, bgcolor: "green" }}>
              <IconButton>
                <Link href="/home">
                  <HomeIcon fontSize="large" />
                </Link>
              </IconButton>
            </Box>
          </Grid>
          <Grid item>
            <Link href="/profile">
              <ProfileIcon fontSize="large" />
            </Link>
          </Grid>
          <Grid item>
            <Link href="/game">
              <GameIcon fontSize="large" />
            </Link>
          </Grid>
        </Grid>
      </Drawer>
    </Box>
  );
};

export default Home;
