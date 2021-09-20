import { atom, selector } from "recoil"
import {tokenAtom} from "./store/user";

export const createApi = (Authorization) => (url, { headers, ...payload }) =>
    fetch(
        `http://192.168.0.4:8000/${url}`,
        // `http://192.168.50.249:8000/${url}`,
        {
            headers: {
                Authorization,
                ...headers
            },
            ...payload
        }
    )


const api = selector({
    key: "api",
    get: ({ get }) => {
        const token = get(tokenAtom)
        return createApi(token || "")
    }
})

export default api