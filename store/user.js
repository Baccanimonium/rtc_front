import { selector } from "recoil"
import tokenState from "./token";
import { URL_USER_PROFILE} from "../constants/ApiUrl";
import api from "../api";



const CurrentUserState = selector({
    key: 'CurrentUserState',
    get: async ({get}) => {
        const {token} = get(tokenState)
        const fetch = get(api)

        if (token) {
            const response = await fetch(URL_USER_PROFILE,{ method: 'GET' });
            return await response.json()
        }
        return {}
    },
});

export default CurrentUserState
