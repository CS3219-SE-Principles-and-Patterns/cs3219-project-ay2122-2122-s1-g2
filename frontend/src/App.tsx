import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./pages/GamePage";
import Home from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
