import Grid from '@mui/material/Grid';
import { Box, Typography } from "@mui/material";
import ErrorBackButton from './ErrorBackButton';


const ErrorContainer = () => {
return(
  <Box sx={{ flexGrow: 1, display: 'flex',
   justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
    <Grid direction="column" container spacing={2} sx={{
       justifyContent: "center",
       alignItems: "center",}}>
        <Grid size={8}>
        <Typography variant="h2" sx={{mb: '2vh'}}>Oops!</Typography>
        </Grid>
        <Grid size={8}>
        <Typography variant="h5" sx={{mb: '2vh'}}>Ein Fehler ist aufgetreten!</Typography>
        </Grid>
        <Grid size={8}>
        <ErrorBackButton/>
        </Grid>
      </Grid>
      </Box>


);
};

export default ErrorContainer;