import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DatePickerComponent = (props) => {
    return <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                sx={props.sx}
                label={props.labelText}
                value={props.currValue}
                onChange={props.change}
            />
        </LocalizationProvider >
    </>
}

export default DatePickerComponent;