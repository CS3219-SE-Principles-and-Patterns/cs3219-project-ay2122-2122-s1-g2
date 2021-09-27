import "./LandingPage.css";
import { useState } from "react";
import Login from "../components/login/Login";
import Register from "../components/login/Register";
import { landingEnum } from "../utils/constants/enums";
import ForgetPassword from "../components/login/ForgetPassword";

const LandingPage = () => {
  const [landingStatus, setLandingStatus] = useState(landingEnum.LOGIN);

  return (
    <div className="main">
      <div className="container">
        {landingStatus === landingEnum.LOGIN ? (
          <Login setLandingStatus={setLandingStatus} />
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
