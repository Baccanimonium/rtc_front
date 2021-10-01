import { atom, selectorFamily } from "recoil"
import {stringifyData} from "./persons";
import api from "../api";
import { URL_EVENT } from "../constants/ApiUrl";

export const eventsCache = atom({
    key: "eventsCache",
    default: {}
})


export const eventsFamilySelector = selectorFamily({
    key: "eventsFamilySelector",
    get: (scheduleId) => async ({ get }) => {
        const fetch = get(api)
        let val = get(eventsCache)[scheduleId]
        if (!val) {

            // TODO Добвить зарузку консультаций, там апи не реализовано
            const [] = await Promise.all([
                async () => {
                    const rawData = await fetch(URL_EVENT(scheduleId), {method: "GET"})
                    return rawData.json()
                }
            ])
        }
        return val
    },
    set: (localStorageKey) => ({ set, get }, newValue) => {
        set(eventsCache, { ...get(eventsCache), [localStorageKey]: newValue })
    }
})
