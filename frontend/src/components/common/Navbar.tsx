import { Drawer, Grid, IconButton, AppBar, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import GameIcon from "@mui/icons-material/SportsEsports";
import FlashCardIcon from "@mui/icons-material/ViewCarousel";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
const NavBar = () => {
  const drawerWidth = 100;
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <>
      <Grid
        display="flex"
        justifyContent="center"
        sx={{ marginBottom: "25vh", marginTop: "5vh" }}
      >
        <Grid item sx={{ backgroundColor: "#ffd8bdff" }}>
          <IconButton>
            <Link to="/home">
              <HomeIcon className="home-icon" fontSize="large" />
            </Link>
          </IconButton>
        </Grid>
      </Grid>
      <Grid display="flex" flexDirection="column" alignItems="center">
        <Grid item>
          <IconButton>
            <Link to="/profile">
              <ProfileIcon className="icon" fontSize="large" />
            </Link>
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <Link to="/flashcard/create">
              <FlashCardIcon className="icon" fontSize="large" />
            </Link>
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <Link to="/game">
              <GameIcon className="icon" fontSize="large" />
            </Link>
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          display: { sm: "none" },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#313584",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Language Learners
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          flexDirection: "column",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#313584",
          },
          display: { xs: "block", sm: "none" },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        anchor="left"
        open
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          flexDirection: "column",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#313584",
          },
          display: { xs: "none", sm: "block" },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default NavBar;
