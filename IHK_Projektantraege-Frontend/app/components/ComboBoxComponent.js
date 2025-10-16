import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from "@mui/material";

const ComboBoxComponent = (props) => {
    return <>
        <Box sx={{ mt: 3 }}>
            <Autocomplete
                value={props.loaded || ""}
                onChange={props.change}
                disablePortal
                options={props.teacher || []}
                sx={{ width: 300 }}
                ListboxProps={{
                    style: {
                      maxHeight: '200px',
                      overflowY: 'auto'
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label={props.titel} error={props.terror} />}
            />
        </Box>
    </>
}

export default ComboBoxComponent;
