import AccordeonInput from "./AccordeonInput"

const TextAccordeon = (props) => {
    return (
        <>
            <AccordeonInput
                accordeonText={props.header}
                accordeonPlaceholder={props.placeholder}
                multiline={true}
                minRows={2}
                maxRows={6}
                inputValue={props.value}
                inputChange={props.change}
                error={props.error}
                helperText={props.helperText}
                maxlenght={props.maxlenght}
            />
        </>
    )
}
export default TextAccordeon