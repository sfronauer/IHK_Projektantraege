import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';

const ProposalTable = (props) => {
    function createData(topic, data) {
        return { topic, data };
    }

    const rows = [
        createData('1. Allgemeine Angaben', props.general),
        createData('2. Thema der betrieblichen Projektarbeit', props.topic),
        createData('3. Geplanter Bearbeitungszeitraum', props.processingperiod),
        createData('4. Beschreibung der Ausgangssituation', props.initial),
        createData('5. Projektziel', props.goal),
        createData('6. Geplante Umsetzung der Projektziele', props.implementation),
        createData('7. Zeitplanung', props.timemanagement),
        createData('8. Präsentationsmittel', props.presentationtools),
        createData('Anlagen', props.attachments),
        props.isPupil && props.isDone != null ? createData('Teacher Comment', props.teacherComment) : null
    ];

    return (
        <>
            <Box sx={{ maxWidth: 800, mx: 'auto', width: '100%' }}>
                <Accordion sx={{ width: '100%' }}>
                    <AccordionSummary
                        sx={{
                            background: 'lightblue',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography
                            component="span"
                            sx={{ whiteSpace: 'normal', wordBreak: 'break-word', maxWidth: 400 }}
                        >
                            {props.topic}
                        </Typography>

                        <Box sx={{ ml: 'auto' }}>
                            <Typography
                                component="span"
                                sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
                            >
                                {props.accepted}
                            </Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                        borderTop: 'solid lightgrey',
                        borderWidth: '1px',
                    }}>

                        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                            <Table sx={{ minWidth: 0 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Thema</TableCell>
                                        <TableCell align="right">Beschreibung</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row?.topic || "key"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell
                                                align="left"
                                                sx={{ whiteSpace: 'normal', wordBreak: 'break-word', maxWidth: 250 }}
                                            >
                                                {row?.topic}
                                            </TableCell>
                                            <TableCell
                                                sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxWidth: 300 }}
                                            >
                                                {row?.data}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </AccordionDetails>
                </Accordion>
            </Box>
        </>
    );
};

export default ProposalTable;