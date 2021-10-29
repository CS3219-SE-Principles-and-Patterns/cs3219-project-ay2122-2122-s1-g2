import { Box } from "@mui/system";
import { removeTokens } from "../../utils/auth/auth";
import { useHistory } from "react-router-dom";

const HomePage = (props: any) => {
  const setIsAuthenticated = props.setIsAuthenticated;
  const history = useHistory();
  const logout = () => {
    removeTokens();
    setIsAuthenticated(false);
    history.push("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }} textAlign="center">
      <h1>Language Learners</h1>
      <button onClick={logout}>Logout</button>
    </Box>
  );
};

export default HomePage;
