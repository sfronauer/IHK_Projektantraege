"use client"
import { TextField} from "@mui/material";

const TextInput = (props) => {
  return (
    <>
      <TextField
        label={props.displayText}
        type={props.type}
        fullWidth={true}
        value={props.value}
        onChange={props.onChange}
        inputProps={{ maxLength: props.maxLength }}
        onKeyDown={props.onKeyDown}
        error={props.error}
      ></TextField>
    </>
  );
};

export default TextInput;
