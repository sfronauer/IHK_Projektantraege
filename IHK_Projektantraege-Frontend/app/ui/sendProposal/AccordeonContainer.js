import TextAccordeon from "../../components/TextAccordeon";
import { useContext } from "react";
import { InputValueContext } from "../../utils/InputValueContext";
import FileInput from "./FileInput";
import PropsHelper from "@/app/model/proposalPart/PropsHelper";
import ProcessingPeriod from "./ProcessingPeriod";

const AccordeonContainer = () => {

    const { inputValue, setInputValue } = useContext(InputValueContext);
    const { error, setError } = useContext(InputValueContext);

    // Handle input change for each accordion field
    const handleInputChange = (e, field) => {
        setError(false);
        setInputValue({
            ...inputValue, // makes a copy of all the values to preserve unchanged fields
            [field]: e?.target?.value ?? e // if its a date it will take the sheer value cuz it dont have no e.target
        });
    };

    return (
        <>
            {PropsHelper().map((part) => (
                part.id == 'projectStart;projectEnd' ?
                    <ProcessingPeriod
                        key={part.id}
                        header={part.header}
                        valueVon={inputValue.projectStart}
                        valueBis={inputValue.projectEnd}
                        changeVon={(date) => { handleInputChange(date, part.id.split(';')[0])}}
                        changeBis={(date) => { handleInputChange(date, part.id.split(';')[1])}}
                    />
                    
                    :
                    <TextAccordeon
                        key={part.id}
                        header={part.header}
                        placeholder={part.description}
                        value={inputValue[part.id]}
                        change={(e) => handleInputChange(e, part.id)}
                        error={error[part.id]}
                        maxlenght={part.maxLenght}
                        helperText={`${inputValue[part.id].length} / ${part.maxLenght}`}
                    />
            ))}

            <FileInput />
        </>
    );
};

export default AccordeonContainer;