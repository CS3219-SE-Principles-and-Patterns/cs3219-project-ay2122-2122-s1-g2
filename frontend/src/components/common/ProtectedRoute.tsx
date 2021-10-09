import { Route, Redirect, RouteProps } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAxiosInstance as axios } from "../../utils/auth/auth";

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const f = async () => {
      try {
        console.log("Running f");
        const res = await axios().post(
          "http://localhost:3000/api/login/token",
          {
            refreshToken: refreshToken,
          }
        );
        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setIsAuthenticated(false);
      }
    };
    f();
  });
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
