import { Box } from "@mui/system";
import { CssButton } from "../../components/common/Components";

const GameDefaultPage = (props: any) => {
  return (
    <Box sx={{ flexGrow: 1 }} textAlign="center">
      <CssButton
        variant="outlined"
        onClick={() => props.findOpponent(props.username, props.language)}
      >
        Find Opponent
      </CssButton>
    </Box>
  );
};

export default GameDefaultPage;
