import PasswordInput from "../../components/PasswordInput";
const LoginPassword = (props) => {

    return <>
        <PasswordInput
            displayText="Passwort *"
            value={props.value}
            onChange={props.onChange}
            error={props.error}
            onKeyDown={props.onKeyDown}
            />
    </>
}

export default LoginPassword;