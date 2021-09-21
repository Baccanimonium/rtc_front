import { atom, selector } from "recoil"
import {tokenAtom} from "./store/user";

export const createApi = (Authorization) => (url, { headers, ...payload }) => fetch(
    `http://192.168.50.249:8000/${url}`,
    {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
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
        return createApi(`Bearer ${token}` || "")
    }
})

export default api