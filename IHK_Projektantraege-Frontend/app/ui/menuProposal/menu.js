import { Box } from "@mui/material";
import MenuButtons from "./menuButtons";

const Menu = () => {
    return (
        <Box sx={{
            flexGrow: 1,
            display: "flex",
            margin: '40vh 0 0 0',
            justifyContent: "center",
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: "center",
                mb: 2

            }}>
                <MenuButtons />
            </Box>
        </Box >
    );
};

export default Menu;
