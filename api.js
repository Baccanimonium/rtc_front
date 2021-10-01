import { atom, selector } from "recoil"
import tokenState from "./store/token";
import { BACK_END_URL } from "./constants/backEndUrl";

export const createApi = (Authorization, setToken) => async (url, { headers, ...payload }) => {
    let response
    try {
        response = await fetch(
            `http://${BACK_END_URL}/${url}`,
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

        if (response.status !== 200) {
            throw new Error((await response.json()).message)
        }

        return response
    } catch (e) {
        if (!response || response.status === 401) {
            setToken({})
        }

        throw e
    }
}



const api = selector({
    key: "api",
    get: ({ get }) => {
        const {token, setToken} = get(tokenState)
        console.log(token, setToken)
        return createApi(`Bearer ${token}` || "", setToken)
    }
})

export default api
