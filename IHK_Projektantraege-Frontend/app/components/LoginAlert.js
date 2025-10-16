import { Box } from "@mui/material";
import AlertComponent from "./AlertComponent";

const LoginAlert = (props) => {
    return <>
        <Box sx={{
            position: "fixed",
            bottom: 50,
        }}
        >
            {props.showAlertReq && (
                <AlertComponent
                    show={true}
                    text="Bitte alle Pflichfelder ausfüllen!"
                    close={props.closeReq}    
                />
            )}
            {props.showAlertData && (
                <AlertComponent
                    show={true}
                    text="Die Login Daten sind falsch!"
                    close={props.closeData}  
                />
            )}

        </Box>
    </>
}

export default LoginAlert;