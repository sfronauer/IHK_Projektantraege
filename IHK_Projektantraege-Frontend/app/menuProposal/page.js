"use client";
import Menu from "../ui/menuProposal/menu";
import AuthTokenHelper from '../utils/AuthTokenHelper';
import Spinner from "../components/Spinner";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../utils/LoginContext";
import { useRouter } from "next/navigation";

const MenuProposal = () => {
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

    return <Menu />;
};

export default MenuProposal;
