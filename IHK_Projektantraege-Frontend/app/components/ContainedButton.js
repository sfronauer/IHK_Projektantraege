import { Button } from "@mui/material";

const ContainedButton = (props) => {
    return <>
        <Button
            variant="contained"
            onClick={props.handleClick}
            sx={{
                width: { xs: '100%', sm: '250px' },
                textTransform: 'none'
            }}>
            {props.text}
        </Button></>
}

export default ContainedButton;