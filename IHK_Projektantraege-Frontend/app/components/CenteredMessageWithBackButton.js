import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

const CenteredMessageWithBackButton = ({ message }) => (
  <Box
    sx={{
      height: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
      textAlign: 'center',
      px: 2
    }}
  >
    <Typography variant="h4">{message}</Typography>
    <Link href="/teacher" passHref legacyBehavior>
      <Button variant="contained" sx={{ mt: 2 }}>
        Zurück zur Auswahl
      </Button>
    </Link>
  </Box>
);

export default CenteredMessageWithBackButton;