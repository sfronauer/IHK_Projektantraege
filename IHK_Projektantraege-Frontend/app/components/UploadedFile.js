import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";


const UploadedFile = ({ value }) => {
    
    const fileName = value?.name || value?.filename || 'Unbenannte Datei'; 

    return (
        <Box sx={{
            margin: '10px',
            padding: '2px',
        }}>
            <Typography component="span" sx={{ marginBottom: '5px' }}>
                {fileName.length > 20 ? `${fileName.substring(0, 20)}...` : fileName}
            </Typography>
        </Box>
    );
};

export default UploadedFile;
