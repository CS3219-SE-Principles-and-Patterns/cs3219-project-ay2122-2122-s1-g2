import { Box } from "@mui/system"
import {Typography } from "@mui/material"

const GameWaitingPage = (props: any) => {
    return (
        <Box sx={{ flexGrow: 1 }} textAlign="center">
            <Typography> Please wait for your opponent to finish </Typography>
        </Box>
    )
}

export default GameWaitingPage;
