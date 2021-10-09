import { Route, Redirect, RouteProps } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAxiosInstance as axios } from "../../utils/auth/auth";

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const f = async () => {
    //const res = await axios().post("http://localhost:3000/api/login/check");
    //if (res) {
    setIsAuthenticated(true);
    console.log(isAuthenticated);
    //}
  };
  useEffect(() => {
    f();
  }, []);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        )
      }
    ></Route>
  );
};
export default ProtectedRoute;
