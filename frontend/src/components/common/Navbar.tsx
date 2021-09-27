import { Drawer, Grid, IconButton, Link } from "@mui/material";
import { Box } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import GameIcon from "@mui/icons-material/SportsEsports";

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
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Grid
          container
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
          spacing={{ xs: 2, md: 3 }}
        >
          <Grid item alignSelf="center">
            <Box
              sx={{ width: 50, height: 50, bgcolor: "yellow", marginTop: 5 }}
            >
              <IconButton>
                <Link href="/home">
                  <HomeIcon fontSize="large" />
                </Link>
              </IconButton>
            </Box>
          </Grid>
          <Grid item alignSelf="center">
            <Box sx={{ width: 50, height: 50, bgcolor: "yellow" }}>
              <IconButton>
                <Link href="/profile">
                  <ProfileIcon fontSize="large" />
                </Link>
              </IconButton>
            </Box>
          </Grid>
          <Grid item alignSelf="center">
            <Box sx={{ width: 50, height: 50, bgcolor: "yellow" }}>
              <IconButton>
                <Link href="/game">
                  <GameIcon fontSize="large" />
                </Link>
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Drawer>
    </Box>
  );
};

export default Navbar;
