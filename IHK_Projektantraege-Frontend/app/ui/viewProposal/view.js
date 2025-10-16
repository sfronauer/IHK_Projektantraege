"use client"
import { Box, Typography } from "@mui/material";
import { useContext, useEffect } from 'react';
import ProposalTable from "./ProposalTable";
import { CombinedAntragContext } from "@/app/utils/CombinedAntragContext";
import { LoginContext } from "@/app/utils/LoginContext";
import { endpoints } from "@/app/utils/Constants";
import FetchPropsCombined from "./fetchProps";
import MenuPageButton from "@/app/components/MenuPageButton";

const View = () => {
    const { combinedAntrag, setCombinedAntrag } = useContext(CombinedAntragContext);
    const { login } = useContext(LoginContext);

    useEffect(() => {
        const fetchData = async () => {
            const combined = await FetchPropsCombined.fetchProposalsCombined(
                endpoints.GetPastProjectProposals,
                endpoints.GetCurrentProjectProposal,
                login.username
            );
            setCombinedAntrag(combined);
        };

        fetchData();
    }, [login.username, setCombinedAntrag]);


    return <>
        <Box display="flex" flexDirection="column" gap={2} sx={{
            px: { xs: 2, sm: 4 },
            py: 2,
            width: '100%',
            maxWidth: '100%',
            overflowX: 'hidden',
            overflowY: 'auto',
            boxSizing: 'border-box',
            alignItems: 'center'
        }}>
            <Typography variant="h4">Projektanträge</Typography>
            {combinedAntrag.map((proposal) => (

                <Box key={proposal.id}
                    sx={{
                        width: '100%',
                        maxWidth: 800,
                        mx: 'auto',
                        overflowX: 'auto',
                    }}>
                    <ProposalTable
                        general={proposal.general}
                        topic={proposal.topic}
                        processingperiod={
                            proposal.projectStart && proposal.projectEnd
                                ? `${proposal.projectStart} - ${proposal.projectEnd}`
                                : ''}
                        initial={proposal.initial}
                        goal={proposal.goal}
                        implementation={proposal.implementation}
                        timemanagement={proposal.timeManagement}
                        attachments={proposal.Attachments.map((file) => file?.filename || file?.name).join(', ')}
                        presentationtools={proposal.presentationTools}
                        accepted={
                            proposal.forChecking === false
                                ? 'In Bearbeitung'
                                : proposal.accepted == null
                                    ? 'Wird überprüft'
                                    : proposal.accepted
                                        ? 'Angenommen'
                                        : 'Abgelehnt'
                        }
                        isPupil={true}
                        isDone={proposal.accepted}
                        teacherComment={proposal.teacherComment}

                    />
                </Box>
            ))}
            <Box sx={{ width: '100%', maxWidth: 800, justifyContent: 'center', display: 'flex' }}>
                <MenuPageButton />
            </Box>
        </Box>
    </>
};

export default View;
