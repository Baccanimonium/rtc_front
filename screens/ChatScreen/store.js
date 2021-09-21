import { selector } from "recoil";
import {tokenAtom} from "../../store/user";
import api from "../../api";
import {URL_CHAT_CHANNELS} from "../../constants/ApiUrl";

const currentUserChannels = selector({
    key: 'currentUserChannels',
    get: async ({get}) => {
        const token = get(tokenAtom)
        const fetch = get(api)
        if (token) {
            const response = await fetch(URL_CHAT_CHANNELS,{ method: 'GET' });
            return await response.json()
        }
        return []
    },
});

export default currentUserChannels