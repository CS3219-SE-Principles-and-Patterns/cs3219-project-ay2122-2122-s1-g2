import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./pages/game/GamePage";
import Home from "./pages/common/HomePage";
import LandingPage from "./pages/common/LandingPage";
import CreateProfilePage from "./pages/profile/CreateProfilePage";
import CreateFlashCardPage from "./pages/flashcard/CreateFlashCardPage";
import { Box } from "@mui/system";
import Navbar from "./components/common/Navbar";
import ProfilePage from "./pages/profile/ProfilePage";
import AuthProvider from "./components/common/AuthProvider";
import ProtectedRoute from "./components/common/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
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
                path="/flashcard"
              />

              <ProtectedRoute children={<Game />} path="/game" />
            </Switch>
          </Box>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
