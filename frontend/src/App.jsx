import Game from "./pages/game/GamePage";
import Home from "./pages/common/HomePage";
import LandingPage from "./pages/common/LandingPage";
import CreateProfilePage from "./pages/profile/CreateProfilePage";
import CreateFlashCardPage from "./pages/flashcard/CreateFlashCardPage";
import { Box } from "@mui/system";
import Navbar from "./components/common/Navbar";
import ProfilePage from "./pages/profile/ProfilePage";
import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Box sx={{ display: "flex" }}>
          <Switch>
            <Route path="/" exact>
              <LandingPage />
            </Route>
            <Route path="/home">
              <Navbar />
              <Home />
            </Route>

            <Route path="/profile/create">
              <Navbar />
              <CreateProfilePage isEdit={false} />
            </Route>
            <Route path="/profile/edit">
              <Navbar />
              <CreateProfilePage isEdit={true} />
            </Route>
            <Route path="/profile">
              <Navbar />
              <ProfilePage />
            </Route>
            <Route path="/flashcard">
              <Navbar />
              <CreateFlashCardPage />
            </Route>
            <Route path="/game">
              <Navbar />
              <Game />
            </Route>
          </Switch>
        </Box>
      </div>
    </Router>
  );
};

export default App;
