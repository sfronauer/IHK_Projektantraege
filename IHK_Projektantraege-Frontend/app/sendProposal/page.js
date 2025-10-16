"use client"

import PupilContainer from "../ui/sendProposal/PupilContainer";
import { InputProvider } from "../utils/InputValueContext";
import { FileProvider } from "../utils/FileContext";
import AuthTokenHelper from "../utils/AuthTokenHelper";
import Spinner from "../components/Spinner";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../utils/LoginContext";


const SendProposal = () => {

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const { setLogin } = useContext(LoginContext);
  const router = useRouter();

  useEffect(() => {
      const checkAuth = async () => {
          const authData = await AuthTokenHelper();
          if (authData && authData.role === "pupil") {
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
    <InputProvider>
      <FileProvider>
          <PupilContainer />
      </FileProvider>
    </InputProvider>
    );
};

export default SendProposal;
