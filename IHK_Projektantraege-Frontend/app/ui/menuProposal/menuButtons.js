"use client"
import MenuComponentButton from "@/app/components/MenuComponentButton";
import { LoginContext } from "../../utils/LoginContext";
import { useContext, useEffect, useState } from "react";
import RequestHandler from "../../model/request/RequestHandler";
import { endpoints } from "../../utils/Constants";
import { redirect } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import { deleteCookie } from 'cookies-next/client';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next/client';

const MenuButtons = () => {
    const { login, setLogin } = useContext(LoginContext);
    const [antragPast, setAntragPast] = useState(null);
    const [antragCurrent, setAntragCurrent] = useState(null);
    const router = useRouter();
    const token = getCookie('token');

    // Fetch data
    useEffect(() => {

        const fetchData = async () => {
            if (token) {
                const antragPast = await RequestHandler.getData(endpoints.GetPastProjectProposals, login.username);
                const antragCurrent = await RequestHandler.getData(endpoints.GetCurrentProjectProposal, login.username);
                if (antragPast.error || antragCurrent.error) {
                    redirect("/error");
                    return;
                }

                setAntragPast(antragPast.data);
                setAntragCurrent(antragCurrent.data);

            } else {
                redirect("/");
                return;
            }
        };

        fetchData();
    }, [login.username]);


    const handleLogout = () => {
        deleteCookie('token');

        setLogin(() => ({
            username: "",
            authenticated: false,
            role: "",
            session: ""
        }));

        router.push('/login');
    };

    // Show loading until data is ready
    if (antragPast === null || antragCurrent === null) {
        return <>
            <CircularProgress />
        </>;
    }

    let hasPastAntrag = antragPast?.data.length > 0;
    let allPastDeclined = antragPast?.data.length > 0 &&
        antragPast.data.every((antrag) => antrag.accepted === false);

    let hasCurrentAntrag = antragCurrent && Object.keys(antragCurrent.data).length > 0;

    if (antragCurrent) {
        hasCurrentAntrag = Object.keys(antragCurrent.data).length !== 0;
    }

    return (
        <>
            {hasCurrentAntrag && (
                <MenuComponentButton url="/sendProposal" text="Antrag weiterbearbeiten" />
            )}

            {!hasCurrentAntrag && (!hasPastAntrag || allPastDeclined) && (
                <MenuComponentButton url="/sendProposal" text="Neuen Antrag anlegen" />
            )}

            {hasPastAntrag && (
                <MenuComponentButton url="/viewProposal" text="Antrag ansehen" />
            )}

            {
                <MenuComponentButton onClick={() => handleLogout()} text="Abmelden" />
            }
        </>
    );
};

export default MenuButtons;