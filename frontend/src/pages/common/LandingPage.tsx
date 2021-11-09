import "./LandingPage.css";
import { useState } from "react";
import { landingEnum } from "../../utils/constants/enums";
import { Redirect } from "react-router-dom";
import ForgetPassword from "../../components/login/ForgetPassword";
import Register from "../../components/login/Register";
import Login from "../../components/login/Login";

const LandingPage = ({ isAuthenticated, setIsAuthenticated }: any) => {
  const [landingStatus, setLandingStatus] = useState(landingEnum.LOGIN);

  return isAuthenticated ? (
    <Redirect to="/home" />
  ) : (
    <div className="main">
      <div className="container">
        {landingStatus === landingEnum.LOGIN ? (
          <Login
            setLandingStatus={setLandingStatus}
            setIsAuthenticated={setIsAuthenticated}
          />
        ) : landingStatus === landingEnum.REGISTER ? (
          <Register setLandingStatus={setLandingStatus} />
        ) : (
          <ForgetPassword setLandingStatus={setLandingStatus} />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
