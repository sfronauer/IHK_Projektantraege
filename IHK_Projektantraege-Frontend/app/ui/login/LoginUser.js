import TextInput from "../../components/TextInput";
const LoginUser = (props) => {

    return <>
        <TextInput
            displayText="Username *"
            type="text"
            maxLength={props.maxLength}
            value={props.value}
            onChange={props.onChange}
            onKeyDown={props.onKeyDown}
            required
            error={props.error}
        />
    </>
}

export default LoginUser;