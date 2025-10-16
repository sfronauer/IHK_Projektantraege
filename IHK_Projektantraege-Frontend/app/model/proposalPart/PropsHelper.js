import ProposalPart from "./ProposalPart";

const PropsHelper = () => {

    const shortMaxLength = 300;
    const midMaxLength = 1000;
    const longMaxLength = 3000;

    return [
        new ProposalPart(
            "general",
            "1* Allgemeine Angaben",
            "Allgemeine Angaben",
            shortMaxLength
        ),
        new ProposalPart(
            "topic",
            "2* Thema der betrieblichen Projektarbeit",
            "Thema der betrieblichen Projektarbeit",
            shortMaxLength
        ),
        new ProposalPart(
            "projectStart;projectEnd",
            "3* Geplanter Bearbeitungszeitraum",
            "Geplanter Bearbeitungszeitraum"
        ),
        new ProposalPart(
            "initial",
            "4* Beschreibung der Ausgangssituation",
            "Beschreibung der Ausgangssituation",
            shortMaxLength
        ),
        new ProposalPart(
            "goal",
            "5* Projektziel",
            "Projektziel",
            shortMaxLength
        ),
        new ProposalPart(
            "implementation",
            "6* Geplante Umsetzung der Projektziele",
            "Geplante Umsetzung der Projektziele",
            shortMaxLength
        ),
        new ProposalPart(
            "timemanagement",
            "7* Zeitplanung",
            "Zeitplanung",
            shortMaxLength
        ),
        new ProposalPart(
            "presentationtools",
            "8* Präsentationsmittel",
            "Präsentationsmittel",
            shortMaxLength
        )

    ]
}
export default PropsHelper;