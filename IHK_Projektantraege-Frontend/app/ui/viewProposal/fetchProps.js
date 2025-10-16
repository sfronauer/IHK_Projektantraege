import RequestHandler from "@/app/model/request/RequestHandler";
import { redirect } from 'next/navigation';

class FetchPropsCombined {
    static async fetchProposalsCombined(getPastEndpoint, getCurrentEndpoint, username) {
        const antragPast = await RequestHandler.getData(getPastEndpoint, username);
        const antragCurrent = await RequestHandler.getData(getCurrentEndpoint, username);

        if(antragPast.error || antragCurrent.error){
            redirect("/error")
        }
        
        // checks if past is empty -> list only consts of CurrentAntrag
        const combined = antragPast.data.data.length > 0
                ? [antragCurrent.data.data, ...antragPast.data.data]
                : [antragCurrent.data.data];

        // deletes empty objects in combined in case Current is empty
        const filtered = combined.filter(item => 
            item && Object.keys(item).length > 0
        );
        return filtered;
    }
}

export default FetchPropsCombined;