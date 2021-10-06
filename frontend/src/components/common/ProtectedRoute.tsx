import { Route, Redirect } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children, ...rest }) => {
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
