import {selector, atom, selectorFamily} from "recoil";
import tokenState from "../../store/token";
import api from "../../api";
import {URL_CHAT_CHANNELS} from "../../constants/ApiUrl";

const currentUserChannels = selector({
    key: 'currentUserChannels',
    get: async ({get}) => {
        try {
            const token = get(tokenState);
            const fetch = get(api);
            if (token) {
                const response = await fetch(URL_CHAT_CHANNELS, {method: 'GET'});
                return await response.json()
            }
            return [];
        } catch (e) {
            console.log(e)
            return []
        }
    },
});

export const messagesStore = atom({key: 'messages', default: {} });
export const messagesSelector = selectorFamily({
    key: 'MyMultipliedNumber',
    get: (channelId) => ({get}) => {
        const { [channelId]: messages = [] } = get(messagesStore)
        return  messages
    },
    set: (channelId) => ({set, get}, newValue) => {
        set(messagesStore,{...get(messagesStore), [channelId]: newValue })
    }
})

export default currentUserChannels