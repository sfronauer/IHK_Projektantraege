class ProposalPart {
    #id
    #header;
    #description;
    #maxLenght;

    constructor(id, header, description, maxLenght) {
        this.id = id;
        this.header = header;
        this.description = description;
        this.maxLenght = maxLenght;
    }
}

export default ProposalPart;