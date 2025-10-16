"use client"
import { useContext, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AccordeonContainer from "../../ui/sendProposal/AccordeonContainer";
import ContainedButton from "../../components/ContainedButton";
import { InputValueContext } from "../../utils/InputValueContext";
import { FileContext } from "../../utils/FileContext";
import { LoginContext } from "../../utils/LoginContext";
import { endpoints } from "../../utils/Constants";
import RequestHandler from "../../model/request/RequestHandler";
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation'
import AlertComponent from "@/app/components/AlertComponent";
import ComboBoxComponent from "@/app/components/ComboBoxComponent";
import Spinner from "../../components/Spinner";

const PupilContainer = () => {
    const { login } = useContext(LoginContext);
    const { inputValue, error, setError, teacher, setTeacher } = useContext(InputValueContext);
    const { files } = useContext(FileContext);
    const [showAlert, setShowAlert] = useState(false);
    const [teachers, setTeachers] = useState();
    const [alertText, setAlertText] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    useEffect(() => {
        const fetchTeachers = async () => {
            const response = await RequestHandler.getData(endpoints.GetAllTeachers, "");
            if (response.error) {
                redirect('/error');
            }
            setTeachers(response.data.data);
        };

        fetchTeachers();
    }, []);

    // Form validation
    const validateForm = () => {
        let ok = true;
        let updatedError = { ...error };

        for (const field in inputValue) {
            if (field == 'projectStart' || field == 'projectEnd') {
                if (new Date(inputValue['projectEnd']) < new Date(inputValue['projectStart'])) {
                    setAlertText("Projektstart darf nicht vor dem Projektende liegen!");
                    ok = false;
                }
                if (new Date(inputValue['projectStart']) < new Date()) {
                    setAlertText("Projektstart darf nicht in der Vergangenheit liegen!");
                    ok = false;
                }
            } else if (inputValue[field] === '' || inputValue['projectStart'] == null) {
                setAlertText("Bitte alle Pflichfelder ausfüllen!");
                updatedError[field] = true;
                ok = false;
            } else if (teacher == "") {
                updatedError.teacherSelection = true;
                ok = false;
                setAlertText("Bitte alle Pflichfelder ausfüllen!");
            }
            else {
                updatedError[field] = false;
            }
        }
        setError(updatedError);
        return ok;
    };

    // sends all data to the databank after validating 
    const handleClickPost = async () => {
        const dataObj = await buildDataObj();
        const antragCurrent = await RequestHandler.getData(endpoints.GetCurrentProjectProposal, login.username);
        if (antragCurrent.error) {
            redirect("/error")
        }

        if (Object.keys(antragCurrent.data.data).length == 0) {
            const resp = await RequestHandler.postData(dataObj, endpoints.AddNewProjectProposal);
            if (resp.error) {
                redirect("/error");
            }
            await handleClickPost();
            return;
        } else {
            if (validateForm()) {

                setLoading(true);

                const rep = await RequestHandler.updateData(dataObj, endpoints.UpdateProposal, " ");
                if (rep.error) {
                    redirect("/error");
                } else {
                    const resp = await RequestHandler.updateData(dataObj, endpoints.SetProposalForChecking, login.username)

                    if (resp.error) {
                        redirect("/error");
                    }
                    else {
                        router.push("/sentProposal");
                    }
                }
            } else {
                setShowAlert(true);
            }
        }
    };

    if (loading) {
        return <Spinner />
    }

    // constructs the obj with the userinputs
    const buildDataObj = async () => {

        const dataObj = {
            ldapUsernameStudent: login.username,
            ldapUsernameTeacher: teacher,
            general: inputValue.general,
            topic: inputValue.topic,
            projectStart: inputValue.projectStart?.format('YYYY-MM-DD') || null,
            projectEnd: inputValue.projectEnd?.format('YYYY-MM-DD') || null,
            initial: inputValue.initial,
            goal: inputValue.goal,
            implementation: inputValue.implementation,
            timeManagement: inputValue.timemanagement,
            presentationTools: inputValue.presentationtools,
            attachments: files
        };

        return dataObj;
    }

    // saves the data obj
    const handleClickSpeichern = async () => {
        const dataObj = await buildDataObj();

        const antragCurrent = await RequestHandler.getData(endpoints.GetCurrentProjectProposal, login.username);
        if (antragCurrent.error) {
            redirect("/error")
        }

        if (Object.keys(antragCurrent.data.data).length != 0) {
            const resp = await RequestHandler.updateData(dataObj, endpoints.UpdateProposal, " ");
            if (resp.error) {
                redirect("/error");
            }
            else {
                router.push("/savedProposal");
            }
        } else {
            const resp = await RequestHandler.postData(dataObj, endpoints.AddNewProjectProposal);
            if (resp.error) {
                redirect("/error");
            }
            else {
                router.push("/savedProposal");
            }
        }
    }

    return (
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Grid container spacing={2}>
                <Grid size={12} mt={5}>
                    <Typography variant="h3" gutterBottom>
                        Projektantrag
                    </Typography>
                </Grid>
                <Grid size={12} sx={{ overflowY: 'auto', maxHeight: '75vh', height: '75vh' }}>
                    <AccordeonContainer />
                    <ComboBoxComponent
                        loaded={teacher}
                        terror={error.teacherSelection}
                        titel="Lehrer auswählen*"
                        teacher={teachers}
                        change={(event, newValue) => setTeacher(newValue)} />
                </Grid>
                <Grid size={12}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2,
                        alignItems: 'center',
                        mt: 2
                    }}>
                        <ContainedButton text="Antrag senden" handleClick={handleClickPost} />
                        <ContainedButton text="Antrag zwischenspeichern" handleClick={handleClickSpeichern} />
                    </Box>
                    {showAlert ?
                        <AlertComponent
                            show={showAlert}
                            text={alertText}
                            close={() => setShowAlert(false)}
                        /> :
                        null}
                </Grid>
            </Grid>
        </Box>
    );
};

export default PupilContainer;