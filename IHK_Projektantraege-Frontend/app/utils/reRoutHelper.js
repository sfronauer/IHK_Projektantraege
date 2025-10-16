"use client";
import LoginContainer from "../ui/login/LoginContainer";
import { LoginContext } from "./LoginContext";
import AuthTokenHelper from "./AuthTokenHelper";
import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Spinner from "../components/Spinner";

const ReRoutHelper = () => {
  const router = useRouter();
  const { setLogin, login } = useContext(LoginContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const result = await AuthTokenHelper();
      if (result) {
        setLogin(result);
        const url =
          result.role === "pupil"
            ? "/menuProposal"
            : result.role === "teacher"
              ? "/teacher"
              : "/login";
        router.push(url);
      } else {
        setLoading(false);
      }
    };

    checkToken();
  }, [setLogin, router]);

  if (loading) {
    return (
      <Spinner />
    );
  }

  return <LoginContainer />
};

export default ReRoutHelper;