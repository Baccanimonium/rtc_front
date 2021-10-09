import React, {useState, useRef, useCallback, useEffect, useContext} from "react";
import {MediaStream, RTCPeerConnection} from 'react-native-webrtc'
import Video from "./Video";
import GettingCall from "./GettingCall";
import {View} from "react-native";
import Button from "./Button";
import {getStream} from "./Utils";
import tw from "tailwind-react-native-classnames";
import {RTCContext, SocketContext} from "../constants/context";
import {useRecoilState} from "recoil";
import {callOfferStore} from "./store";

export default function Rtc() {
    const { pc: { current: pc }, localStream, remoteStream, updateContext } = useContext(RTCContext)
    const [gettingCallOffers, setGettingCallOffers] = useRecoilState(callOfferStore)
    const ws = useContext(SocketContext);

    // useEffect(() => {
    //     const cRef = firestore().collection("meet").doc("chatId")
    //
    //     const subscribe = cRef.onSnapshot(snapshot => {
    //         const data = snapshot.data()
    //         if (pc.current && !pc.current.remoteDescription && data && data.answer) {
    //             pc.current.setRemoteDescription(new RTCSessionDescription(data.answer))
    //         }
    //
    //         if (data && data.offer && !connecting.current) {
    //             setGettingCallOffers(true)
    //         }
    //     })
    //
    //     const subscribeDelete = cRef.collection("calle").onSnapshot(snapshot => {
    //         snapshot.docChanges().forEach((change) => {
    //             if (change.type === "removed") {
    //                 hangup()
    //             }
    //         })
    //     })
    //
    //     return () => {
    //         subscribe()
    //         subscribeDelete()
    //     }
    // }, [])

    // const collectIceCandidates = useCallback(async (cRef, localName, remoteName) => {
    //     const candidateCollection = cRef.collection(localName)
    //
    //     pc.current.onicecandidate = (event) => {
    //         if (event.candidate) {
    //             candidateCollection.add(event.candidate)
    //         }
    //     }
    //
    //     cRef.collection(remoteName).onSnapshot(snapshot => {
    //         snapshot.docChanges().forEach(change => {
    //             if (change.type === "added") {
    //                 const candidate = new RTCIceCandidate(change.doc.data())
    //                 pc.current?.addIceCandidate(candidate)
    //             }
    //         })
    //     })
    // }, [])

    const setupWebrtc = useCallback(async () => {

        const stream = await getStream()
        if (stream) {
            setLocalStream(stream)
            pc.addStream(stream)
        }



    }, [])

    const create = useCallback(async () => {
        await setupWebrtc()

        // connection to server there
        // const cRef = firestore().collection('meet').doc("chatId")
        //
        // await collectIceCandidates(cRef, "caller", "callee")
        //
        // if (pc.current) {
        //     const offer = await pc.current.createOffer()
        //     pc.current.setLocalDescription(offer)
        //
        //     const cWithOffer = {
        //         offer: {
        //             type: offer.type,
        //             sdp: offer.sdp,
        //         }
        //     }
        //
        //     cRef.set(cWithOffer)
        // }
    }, [])
    const join = useCallback(async () => {

        setGettingCallOffers(null)


        // const cRef = firestore().collction("meet").doc("chatId")
        // const offer = (await cRef.get()).data()?.offer
        //
        // if (offer) {
        //     await setupWebrtc()
        //
        //     await collectIceCandidates(cRef, "callee", "caller")
        //
        //     if (pc.current) {
        //         pc.current.setRemoteDescription(new RTCSessionDescription(offer))
        //
        //         const answer = pc.current.createAnswer()
        //         pc.current.setLocalDescription(answer)
        //
        //         const cWithAnswer = {
        //             answer: {
        //                 type: answer.type,
        //                 sdp: answer.sdp
        //             }
        //         }
        //
        //         cRef.update(cWithAnswer)
        //     }
        // }
    }, [gettingCallOffers])
    const hangup = useCallback(async () => {
        setGettingCallOffers(null)
        streamCleanUp()

        if (pc) {
            pc.close()
        }
    }, [])

    const streamCleanUp = useCallback(async () => {
        if (localStream) {
            localStream.getTracks().forEach(t => t.stop())
            localStream.release()
        }

        updateContext({ localStream: null })
        updateContext({ remoteStream: null })
    }, [])



    if (gettingCallOffers) {
        return <GettingCall
            hangup={hangup}
            join={join}
        />
    }

    if (localStream) {
        return <Video
            hangup={hangup}
            localStream={localStream}
            remoteStream={remoteStream}
        />
    }
    return (
        <View style={tw`h-full`}>
            <Button
                iconName="videocamera"
                backgroundColor="gray"
                // onPress={create}
            />
        </View>
    )
}