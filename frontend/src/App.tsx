import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./pages/game/GamePage";
import Home from "./pages/common/HomePage";
import LandingPage from "./pages/common/LandingPage";
import CreateProfilePage from "./pages/profile/CreateProfilePage";
import CreateFlashCardPage from "./pages/flashcard/CreateFlashCardPage";
import { Box } from "@mui/system";
import Navbar from "./components/common/Navbar";
import ProfilePage from "./pages/profile/ProfilePage";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Box sx={{ display: "flex" }}>
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <LandingPage />
            </Route>
            <Route path="/home">
              <Home />
            </Route>

            <Route path="/profile/create">
              <CreateProfilePage isEdit={false} />
            </Route>
            <Route path="/profile/edit">
              <CreateProfilePage isEdit={true} />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
            <Route path="/flashcard">
              <CreateFlashCardPage />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
          </Switch>
        </Box>
      </div>
    </Router>
  );
};

export default App;
