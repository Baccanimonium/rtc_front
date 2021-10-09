import React, {useCallback, useContext, useMemo} from "react";
import {ON_CANDIDATE, ON_OFFER} from "../screens/ChatScreen/constants";
import {RTCContext} from "../constants/context";
import {useRecoilState} from "recoil";
import {callOfferStore} from "./store";
import { RTCSessionDescription } from "react-native-webrtc"

export default (ChildComponent) => ({messageHandlers, ...props}) => {
    const { pc } = useContext(RTCContext)
    const [gettingCallOffers, setGettingCallOffers] = useRecoilState(callOfferStore)


    const onOfferHandler = useCallback(async (offer, ws) => {
        // const peer = pc || await createNewPeerConnection()
        if (!offer) {
            return console.log('failed to parse answer')
        }
        setGettingCallOffers(offer)
        pc.current.setRemoteDescription(new RTCSessionDescription(offer))
        pc.current.createAnswer().then(answer => {
            pc.current.setLocalDescription(answer)
            ws.send({type: 'answer', payload: JSON.stringify(answer) })
        })

    }, [])

    const onCandidateHandler = useCallback(async (candidate) => {
        // const peer = pc || await createNewPeerConnection()
        if (!candidate) {
            return console.log('failed to parse candidate')
        }
        pc.current.addIceCandidate(candidate)
    }, [])

    const rtcHandlers = useMemo(() => ({
        ...messageHandlers,
        [ON_CANDIDATE]: onCandidateHandler,
        [ON_OFFER]: onOfferHandler
    }), [])

    return <ChildComponent
        {...props}
        messageHandlers={rtcHandlers}
    />
}