import { Route, Redirect, RouteProps } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAxiosInstance as axios, removeTokens } from "../../utils/auth/auth";
import { ACCESS_TOKEN } from "../../utils/constants/tokens";

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAccessToken = async () => {
      try {
        await axios().post("http://localhost:3000/api/login/verify");
        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (e) {
        removeTokens();
        setIsLoading(false);
        setIsAuthenticated(false);
      }
    };
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      verifyAccessToken();
    } else {
      removeTokens();
      setIsLoading(false);
      setIsAuthenticated(false);
    }
  }, []);
  return isLoading ? (
    <p>Loading</p>
  ) : (
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
