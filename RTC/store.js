import {atom} from "recoil";

export const callOfferStore = atom({
    key: "callOfferStore",
    default: null
})

export const localStream = atom({
    key: "localStream",
    default: null
})

export const remoteStream = atom({
    key: "remoteStream",
    default: null
})