import {mediaDevices, RTCPeerConnection} from "react-native-webrtc";
import {useCallback, useContext} from "react";
import {RTCContext, SocketContext} from "../constants/context";

export default () => {
    const { updateContext } = useContext(RTCContext)

    return useCallback(async () => {
        let isFront = true

        const sourceInfos = await mediaDevices.enumerateDevices()
        let videoSourceId
        sourceInfos.forEach(({kind, facing, deviceId}) => {
            if (kind === "videoinput" && facing === (isFront ? "front" : "environment")) {
                videoSourceId = deviceId
            }
        })
        const stream = await mediaDevices.getUserMedia({
            audio: true,
            video: {
                width: 480,
                height: 640,
                frameRate: 30,
                facingMode: isFront ? "user" : "environment",
                deviceId: videoSourceId
            }
        })

        let newPc = new RTCPeerConnection()
        return (ws) => {
            newPc.onicecandidate = e => {
                if (!e.candidate) {
                    return
                }

                ws.send({ type: 'candidate', payload: JSON.stringify(e.candidate) })
            }

            newPc.addStream(stream)
            updateContext({ localStream: stream })

            newPc.onaddstream = (event) => {
                console.log(event.stream)
                updateContext({remoteStream:event.stream})
            }
            updateContext({ pc: newPc })
            // stream.getTracks().forEach(track => newPc.addTrack(track, stream))
            return newPc
        }
    }, [])
}
