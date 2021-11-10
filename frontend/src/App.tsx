import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Box } from "@mui/system";

import Game from "./pages/game/GameMainPage";
import Home from "./pages/common/HomePage";
import ProfilePage from "./pages/profile/ProfilePage";
import LandingPage from "./pages/common/LandingPage";
import CreateProfilePage from "./pages/profile/CreateProfilePage";
import CreateFlashCardPage from "./pages/flashcard/CreateFlashCardPage";
import FlashCardDetailPage from "./pages/flashcard/FlashCardDetailPage";
import LeaderBoardPage from "./pages/leaderboard/LeaderboardPage";
import NavBar from "./components/common/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import { removeTokens } from "./utils/auth/auth";
import { ACCESS_TOKEN } from "./utils/constants/tokens";
import { LoginController } from "./controller/LoginController";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const verifyAccessToken = async () => {
      try {
        LoginController.verifyToken();
        setIsAuthenticated(true);
      } catch (e) {
        removeTokens();
        setIsAuthenticated(false);
      }
    };

    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      verifyAccessToken();
    } else {
      removeTokens();
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <Box sx={{ display: "flex" }}>
          {isAuthenticated ? <NavBar /> : <div></div>}
          <Switch>
            <Route path="/" exact>
              <LandingPage
                setIsAuthenticated={setIsAuthenticated}
                isAuthenticated={isAuthenticated}
              />
            </Route>
            <ProtectedRoute
              children={<Home setIsAuthenticated={setIsAuthenticated} />}
              path="/home"
            />

            <ProtectedRoute
              children={<CreateProfilePage isEdit={false} />}
              path="/profile/create"
            />

            <ProtectedRoute
              children={<CreateProfilePage isEdit={true} />}
              path="/profile/edit"
            />

            <ProtectedRoute children={<ProfilePage />} path="/profile" />

            <ProtectedRoute
              children={<CreateFlashCardPage />}
              path="/flashcard/create"
              exact
            />
            <ProtectedRoute
              children={<CreateFlashCardPage isEdit="true" />}
              path="/flashcard/edit/:id"
              exact
            />
            <ProtectedRoute
              path="/flashcard/:id"
              children={<FlashCardDetailPage />}
            />

            <ProtectedRoute
              path="/leaderboard"
              children={<LeaderBoardPage />}
            />

            <ProtectedRoute children={<Game />} path="/game" />
          </Switch>
        </Box>
      </div>
    </Router>
  );
};

export default App;
