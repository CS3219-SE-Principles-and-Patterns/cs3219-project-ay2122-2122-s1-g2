import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./pages/game/GameMainPage";
import Home from "./pages/common/HomePage";
import LandingPage from "./pages/common/LandingPage";
import CreateProfilePage from "./pages/profile/CreateProfilePage";
import CreateFlashCardPage from "./pages/flashcard/CreateFlashCardPage";
import { Box } from "@mui/system";
import Navbar from "./components/common/Navbar";
import ProfilePage from "./pages/profile/ProfilePage";
import FlashCardDetailPage from "./pages/flashcard/FlashCardDetailPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
            <ProtectedRoute children={<Home />} path="/home" />

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

            <ProtectedRoute children={<Game />} path="/game" />
          </Switch>
        </Box>
      </div>
    </Router>
  );
};

export default App;
