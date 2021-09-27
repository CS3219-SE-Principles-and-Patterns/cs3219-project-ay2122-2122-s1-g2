import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./pages/Game";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";

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
            <Profile />
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
