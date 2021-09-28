import "./LandingPage.css";
import { useState } from "react";
import { landingEnum } from "../../utils/constants/enums";

import ForgetPassword from "../../components/login/ForgetPassword";
import Register from "../../components/login/Register";
import Login from "../../components/login/Login";

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
