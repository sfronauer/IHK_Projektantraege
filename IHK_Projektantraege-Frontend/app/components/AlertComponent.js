import Alert from '@mui/material/Alert';
import { Fade, Box } from '@mui/material';

const AlertComponent = (props) => {
    return (
        <Fade in={props.show} timeout={500}>
            <Box sx={{ mt: 2}}>
                <Alert
                    severity="warning"
                    color="error"
                    onClose={props.close}
                >
                    {props.text}
                </Alert>
            </Box>
        </Fade>
    );
};

export default AlertComponent;