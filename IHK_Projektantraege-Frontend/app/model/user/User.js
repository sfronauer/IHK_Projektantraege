import { endpoints } from "@/app/utils/Constants";
import RequestHandler from "../request/RequestHandler";

class User {
    #login;

    constructur(login){
        this.login = login;
    }

    get login() {
        return this.#login;
    }

    set login(login) {
        this.#login = login;
    }

    static async makeLogin(username, password){
        const dataObj = {
            ldapUserName: username,
            password: password
        };
        return await RequestHandler.postData(dataObj, endpoints.Login);
    }
}

export default User;