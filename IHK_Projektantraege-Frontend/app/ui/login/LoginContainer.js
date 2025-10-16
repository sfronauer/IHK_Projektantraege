"use client"
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import LoginHeader from "./LoginHeader";
import LoginUser from "./LoginUser";
import LoginPassword from "./LoginPassword";
import ContainedButton from "../../components/ContainedButton";
import { useState } from "react";
import User from "../../model/user/User";
import { useContext } from "react";
import { LoginContext } from "../../utils/LoginContext";
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useHotkeys } from 'react-hotkeys-hook'
import LoginAlert from "@/app/components/LoginAlert";


const LoginContainer = () => {
  const router = useRouter();
  const { login, setLogin } = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showAlertReq, setShowAlertReq] = useState(false);
  const [showAlertData, setShowAlertData] = useState(false);

  
  const clickEvent = () => {
    if (!validateForm()) {
      setShowAlertData(false);
      setShowAlertReq(true);
    } else {
      handleClick();
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      clickEvent();
    }
  };

  const validateForm = () => {
    if (password === '' || username === '') {
      return false;
    }
    return true;
  };

  const handleClick = async () => {
    const response = await User.makeLogin(username, password);
    if (response.error) {
      redirect("/error");
    } else if (!response.data.data.authenticated) {
      setShowAlertReq(false);
      setShowAlertData(true);
    }

    setLogin(() => ({
      username: username,
      authenticated: response.data.data.authenticated,
      role: response.data.data.role,
      session: document.cookie
    }));
  
    const url = response.data.data.role == 'pupil' ? '/menuProposal' : response.data.data.role == 'teacher' ? '/teacher' : '';
    router.push(url);
  }

  useHotkeys('enter', () => {
    clickEvent();
  }); // Wenn kein field ausgewählt ist

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            <LoginHeader />
          </Grid>
          <Grid size={12}>
            <LoginUser
              maxLength={10}
              value={username}
              onChange={(e) => { setUsername(e.target.value); setShowAlertData(false); }} 
              onKeyDown={handleKeyDown}
              error={username === '' && showAlertReq || showAlertData} />
        
          </Grid>
          <Grid size={12}>
            <LoginPassword
              value={password}
              onChange={(e) => { setPassword(e.target.value); setShowAlertData(false); }}
              onKeyDown={handleKeyDown}
              error={ password === '' && showAlertReq || showAlertData}
            />
          </Grid>
          <Grid size={12}>
            <ContainedButton
              text="Login"
              handleClick={() => {
                if (!validateForm()) {
                  setShowAlertData(false);
                  setShowAlertReq(true);
                } else {
                  handleClick();
                }
              }}
            >
            </ContainedButton>
          </Grid>
        </Grid>

        <LoginAlert
          showAlertReq={showAlertReq}
          showAlertData={showAlertData}
          closeReq={() => setShowAlertReq(false)}
          closeData={() => setShowAlertData(false)}
        />
      </Box>
    </>



  );
};

export default LoginContainer;
