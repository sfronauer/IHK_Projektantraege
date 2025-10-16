import { Box, Typography } from "@mui/material";
import ContainedButton from "../../components/ContainedButton";
import Link from 'next/link';
import MenuPageButton from '../../components/MenuPageButton'

const Sent = (props) => {
    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                margin: '40vh 0 0 0',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2
            }}>
                <Typography variant="h4" sx={{ textAlign: 'center' }}>Abgeschickt!</Typography>
                <Box>
                    <Link href='/viewProposal' >
                        <ContainedButton
                            text="Antrag ansehen"
                            handleClick={props.view}
                        />
                    </Link>
                </Box>

                <MenuPageButton />
            </Box>
        </>
    );
};

export default Sent;