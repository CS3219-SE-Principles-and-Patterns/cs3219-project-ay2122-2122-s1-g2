import "./LandingPage.css";
import { useState } from "react";
import Login from "../components/login/Login";
import Register from "../components/login/Register";

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleIsLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="container">
      {isLogin ? (
        <Login toggleIsLogin={toggleIsLogin} />
      ) : (
        <Register toggleIsLogin={toggleIsLogin} />
      )}
    </div>
  );
};

export default LandingPage;
