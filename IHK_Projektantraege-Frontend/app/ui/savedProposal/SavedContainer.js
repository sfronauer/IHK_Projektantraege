import { Box, Typography } from "@mui/material";
import ContainedButton from "../../components/ContainedButton";
import Link from 'next/link';
import MenuPageButton from '../../components/MenuPageButton';

const SavedContainer = (props) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '40vh',
                px: 2,
            }}
        >
            <Box sx={{
                maxWidth: 400,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}>
                <Typography variant="h4" sx={{ textAlign: 'center' }}>
                    Gespeichert!
                </Typography>

                <Link href="/viewProposal" passHref>
                    <ContainedButton
                        text="Antrag ansehen"
                        handleClick={props.view}
                        sx={{ width: '100%' }}
                    />
                </Link>

                <MenuPageButton sx={{ width: '100%' }} />
            </Box>
        </Box>
    );
};

export default SavedContainer;
