import { atom, selector } from "recoil"
import { URL_USER_PROFILE} from "../constants/ApiUrl";
import api from "../api";
export const tokenAtom = atom({ key: "token", default: {} })


const CurrentUserState = selector({
    key: 'CurrentUserState',
    get: async ({get}) => {
        const {token} = get(tokenAtom)
        const fetch = get(api)
        console.log(token)
        if (token) {
            const response = await fetch(URL_USER_PROFILE,{ method: 'GET' });
            return await response.json()
        }
        return {}
    },
});

export default CurrentUserState
