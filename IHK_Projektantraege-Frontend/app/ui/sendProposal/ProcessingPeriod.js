import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, Divider } from "@mui/material";
import DatePickerComponent from "@/app/components/DatePickerComponent";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ProcessingPeriod = (props) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header">
                <Typography component="span">{props.header}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{
                borderTop: 'solid lightgrey',
                borderWidth: '1px',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'stretch', sm: 'stretch' },
                }}>
                    <DatePickerComponent
                        sx={{ mr: { sm: 5, xs: 0 } }}
                        labelText="Von"
                        currValue={props.valueVon}
                        change={props.changeVon}
                    />

                    <Divider orientation="vertical" variant="middle" flexItem />

                    <DatePickerComponent
                        labelText="Bis"
                        currValue={props.valueBis}
                        change={props.changeBis}
                    />
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}

export default ProcessingPeriod;