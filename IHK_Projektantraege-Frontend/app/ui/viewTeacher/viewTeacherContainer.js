"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import RequestHandler from "@/app/model/request/RequestHandler";
import { endpoints } from "@/app/utils/Constants";
import Spinner from "@/app/components/Spinner";
import { Box, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import ProposalTable from "../viewProposal/ProposalTable";
import Link from 'next/link';
import ContainedButton from "@/app/components/ContainedButton";
import CenteredMessageWithBackButton from "../../components/CenteredMessageWithBackButton";
import { LoginContext } from "@/app/utils/LoginContext";
import AlertComponent from "@/app/components/AlertComponent";
import { useRouter } from "next/navigation";

const ViewTeacherContainer = () => {
    const searchParams = useSearchParams();
    const proposalId = searchParams.get("proposalId");

    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);

    const [teacherComment, setTeacherComment] = useState("")
    const [showAlert, setShowAlert] = useState(false);

    const { login } = useContext(LoginContext);
    const router = useRouter();

    useEffect(() => {
        if (!proposalId) {
            router.push("/error");
        };


        const fetchProposal = async () => {
            setLoading(true);
            const rep = await RequestHandler.getData(endpoints.GetProposalById, proposalId);
            setTeacher(rep.data.data);
            setLoading(false);
        };

        fetchProposal();
    }, [proposalId]);

    const onDecision = async (accepted) => {
        const dataObj = {
            teacherComment: teacherComment
        }

        if (!accepted && teacherComment == "") {
            setShowAlert(true);
            return;
        }

        const rep = await RequestHandler.finalizeData(dataObj, endpoints.SetProposalOutcome, teacher.ldapUsernameStudent, accepted)

        if (rep.error) {
            router.push("/error");
            return;
        }
        router.push("/teacher");
    }

    if (loading) return <Spinner />;

    if (teacher.accepted != null)
        return <CenteredMessageWithBackButton message="Antrag wurde bereits überprüft" />;

    if (!teacher.ldapUsernameStudent)
        return <CenteredMessageWithBackButton message="Kein Antrag gefunden" />;

    if (!teacher.forChecking)
        return <CenteredMessageWithBackButton message="Antrag ist noch unter bearbeitung" />;

    if (teacher.ldapUsernameTeacher != login.username) {
        return <CenteredMessageWithBackButton message="Antrag ist an einen anderen Lehrer zugewiesen" />;
    }



    return (
        <>
            {!proposalId ? router.push("/error") :

                <Box display="flex" flexDirection="column" gap={2} sx={{
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Typography
                        variant="h4"
                        gutterBottom sx={{
                            mb: '5vh',
                            textAlign: 'center'
                        }}> Projektantrag in Detail-Ansicht</Typography>


                    <Box sx={{ width: '100%', maxWidth: 800 }}>
                        <ProposalTable
                            general={teacher.general}
                            topic={teacher.topic}
                            processingperiod={teacher.projectStart && teacher.projectEnd ? teacher.projectStart + '   -   ' + teacher.projectEnd : ''}
                            initial={teacher.initial}
                            goal={teacher.goal}
                            implementation={teacher.implementation}
                            timemanagement={teacher.timeManagement}
                            attachments={teacher.Attachments ? teacher.Attachments.map(file => file?.filename || file?.name).join(', ') : null}
                            presentationtools={teacher.presentationTools}
                            accepted={teacher.accepted}
                        />
                        <TextField
                            sx={{ mt: '2vh' }}
                            fullWidth
                            label="Kommentar"
                            multiline
                            rows={6}
                            slotProps={{ htmlInput: { maxLength: 400 } }}
                            helperText={`${teacherComment.length} / ${400}`}
                            value={teacherComment}
                            onChange={(e) => setTeacherComment(e.target.value)}
                            error={showAlert}
                        />

                    </Box>


                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: 800,
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'center',
                            gap: {xs: 2, sm: 4.5},
                        }}
                    >
                        <Link href="/teacher">
                            <ContainedButton text={"Zurück"} />
                        </Link>
                        <ContainedButton text={"Annehmen"} handleClick={() => onDecision(true)} />
                        <ContainedButton text={"Ablehnen"} handleClick={() => onDecision(false)} />
                    </Box>

                    {showAlert ?
                        <AlertComponent
                            show={showAlert}
                            text="Bitte Kommentar angeben"
                            close={() => setShowAlert(false)}
                        /> :
                        null}
                </Box>
            }
        </>
    );
};

export default ViewTeacherContainer;
