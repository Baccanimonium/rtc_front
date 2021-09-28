import { atom, selector } from "recoil"
import {tokenAtom} from "./store/user";

export const createApi = (Authorization, setToken) => async (url, { headers, ...payload }) => {
    let response
    try {
        response = await fetch(
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
        return response
    } catch (e) {
        if (response.status === 401) {
            setToken({})
        }

        throw e
    }
}



const api = selector({
    key: "api",
    get: ({ get }) => {
        const {token, setToken} = get(tokenAtom)
        return createApi(`Bearer ${token}` || "", setToken)
    }
})

export default api
