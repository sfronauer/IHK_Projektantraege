import ContainedButton from "./ContainedButton";
import Link from 'next/link';
import { Box } from "@mui/material";

const MenuPageButton = () => {
    return <>
        <Box sx={{ position: 'relative', bottom: 0, mb: 10, mt: 0 }}>
            <Link href="/menuProposal">
                <ContainedButton text="Zurück zur Home-Page"></ContainedButton>
            </Link>
        </Box>
    </>
}

export default MenuPageButton;