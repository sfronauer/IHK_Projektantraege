'use client';
import RequestHandler from '@/app/model/request/RequestHandler';
import { endpoints } from '@/app/utils/Constants';
import { LoginContext } from '@/app/utils/LoginContext';
import { useState, useEffect, useContext } from 'react';
import { Box, Typography } from '@mui/material/';
import ListComponent from '../../components/ListComponent';
import MenuComponentButton from '@/app/components/MenuComponentButton';
import { deleteCookie } from 'cookies-next/client';
import { useRouter } from 'next/navigation';

const TeacherContainer = () => {
  const [antragForChecking, setAntragForChecking] = useState(null);
  const { login, setLogin } = useContext(LoginContext);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const forChecking = await RequestHandler.getData(
        endpoints.GetAllProjectPropsalsForChecking,
        login.username
      );
      setAntragForChecking(forChecking.data.data);
    };

    fetchData();
  }, [login.username, setAntragForChecking]);

  const handleLogout = () => {
    deleteCookie('token');

    setLogin(() => ({
      username: '',
      authenticated: false,
      role: '',
      session: '',
    }));

    router.push('/login');
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{
          overflowY: 'auto',
          maxHeight: '75vh',
          height: '75vh',
          width: '100%',
          maxWidth: 600,
          mx: 'auto',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          mt: '5vh',
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            mb: '5vh',
            textAlign: 'center',
          }}
        >
          Ihnen zugewiesene Projektanträge
        </Typography>

        {antragForChecking?.length != 0 ? (
          <ListComponent antrag={antragForChecking} />
        ) : (
          <Typography variant="h4" gutterBottom sx={{ mb: '5vh', textAlign: 'center' }}>
            Keine Anträge zum Überprüfen
          </Typography>
        )}
        <Box display="flex" justifyContent="center" mt={4}>
          <MenuComponentButton onClick={() => handleLogout()} text="Abmelden" />
        </Box>
      </Box>
    </>
  );
};

export default TeacherContainer;
