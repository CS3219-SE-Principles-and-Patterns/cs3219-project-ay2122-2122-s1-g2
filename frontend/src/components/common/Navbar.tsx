import { Drawer, Grid, IconButton, Link } from "@mui/material";
import { Box } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import GameIcon from "@mui/icons-material/SportsEsports";
import FlashCardIcon from "@mui/icons-material/ViewCarousel";
import "./Navbar.scss";

const Navbar = () => {
  const drawerWidth = 100;
  return (
    <Box>
      <Drawer
        variant="permanent"
        anchor="left"
        open={true}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          flexDirection: "column",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#313584",
          },
        }}
      >
        <Grid
          display="flex"
          justifyContent="center"
          sx={{ marginBottom: "25vh", marginTop: "5vh" }}
        >
          <Grid item sx={{ backgroundColor: "#ffd8bdff" }}>
            <IconButton>
              <Link href="/home">
                <HomeIcon className="home-icon" fontSize="large" />
              </Link>
            </IconButton>
          </Grid>
        </Grid>
        <Grid display="flex" flexDirection="column" alignItems="center">
          <Grid item>
            <IconButton>
              <Link href="/profile/create">
                <ProfileIcon className="icon" fontSize="large" />
              </Link>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <Link href="/flashcard/create">
                <FlashCardIcon className="icon" fontSize="large" />
              </Link>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <Link href="/game">
                <GameIcon className="icon" fontSize="large" />
              </Link>
            </IconButton>
          </Grid>
        </Grid>
      </Drawer>
    </Box>
  );
};

export default Navbar;
