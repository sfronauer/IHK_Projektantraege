import { Accordion, TextField, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

const AccordeonInput = (props) => {
    return (
        <Accordion >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header">
                <Typography component="span">{props.accordeonText}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{
                borderTop: 'solid lightgrey',
                borderWidth: '1px',
            }}>
                <TextField
                    slotProps={{ htmlInput: { maxLength: props.maxlenght } }}
                    fullWidth
                    id="accordeonTextField"
                    type="text"
                    label={props.accordeonPlaceholder}
                    multiline={props.multiline}
                    minRows={props.minRows}
                    maxRows={props.maxRows}
                    value={props.inputValue}
                    onChange={props.inputChange}
                    error={props.error}
                    helperText={props.helperText}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordeonInput;