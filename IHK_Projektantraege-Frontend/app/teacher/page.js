'use client';
import AuthTokenHelper from '../utils/AuthTokenHelper';
import Spinner from '../components/Spinner';
import { LoginContext } from '../utils/LoginContext';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TeacherContainer from '../ui/teacher/teacherContainer';

const Teacher = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const { setLogin } = useContext(LoginContext);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authData = await AuthTokenHelper();
      if (authData && authData.role === 'teacher') {
        setLogin(authData);
        setLoggedIn(true);
      } else {
        router.push('/error');
      }
      setLoading(false);
    };
    checkAuth();
  }, [router, setLogin]);

  if (loading || !loggedIn) {
    return <Spinner />;
  }

  return (
    <>
      <TeacherContainer />
    </>
  );
};

export default Teacher;
