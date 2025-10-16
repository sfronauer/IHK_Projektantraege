"use client"

import { useRouter } from 'next/navigation'
import { Box, Button } from '@mui/material';

const ErrorBackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/login"); 
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Zurück
      </Button>
    </Box>
  );
};

export default ErrorBackButton;

