import { createContext } from 'react';
import { useState, useContext, useEffect } from "react";
import { LoginContext } from './LoginContext';
import RequestHandler from '../model/request/RequestHandler';
import { endpoints } from './Constants';
import { redirect } from 'next/navigation'
import dayjs from 'dayjs';

export const InputValueContext = createContext();

export const InputProvider = ({ children }) => {

    const { login } = useContext(LoginContext);

    const loadSaved = async () => {
        const antragCurrent = await RequestHandler.getData(endpoints.GetCurrentProjectProposal, login.username);
        if (antragCurrent.error) {
            redirect("/error")
        }

        setInputValue({
            general: antragCurrent.data.data.general || '',
            topic: antragCurrent.data.data.topic || '',
            projectStart: antragCurrent.data.data.projectStart ? dayjs(antragCurrent.data.data.projectStart) : null,
            projectEnd: antragCurrent.data.data.projectEnd ? dayjs(antragCurrent.data.data.projectEnd) : null,
            initial: antragCurrent.data.data.initial || '',
            goal: antragCurrent.data.data.goal || '',
            implementation: antragCurrent.data.data.implementation || '',
            timemanagement: antragCurrent.data.data.timeManagement || '',
            presentationtools: antragCurrent.data.data.presentationTools || '',
            attachments: antragCurrent.data.data.Attachments || []
        });

        setTeacher(antragCurrent.data.data.ldapUsernameTeacher || "");
    }

    const [inputValue, setInputValue] = useState({
        general: '',
        topic: '',
        projectStart: dayjs(),
        projectEnd: dayjs(),
        initial: '',
        goal: '',
        implementation: '',
        timemanagement: '',
        presentationtools: '',
        attachments: null
    });

    const [error, setError] = useState({
        general: false,
        topic: false,
        initial: false,
        goal: false,
        implementation: false,
        timemanagement: false,
        presentationtools: false,
        teacherSelection: false
    })

    const [teacher, setTeacher] = useState("");

    useEffect(() => {
        if (login?.username && login?.authenticated) {
            loadSaved();
        }
    }, [login]);

    return (
        <InputValueContext.Provider value={{ inputValue, setInputValue, error, setError, teacher, setTeacher }}>
            {children}
        </InputValueContext.Provider>
    )
}