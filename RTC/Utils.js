import { mediaDevices } from 'react-native-webrtc'

export const getStream = async () => {
    let isFront = true
    const sourceInfos = await mediaDevices.enumerateDevices()

    let videoSourceId
    sourceInfos.forEach(({kind, facing, deviceId }) => {
        if (kind === "videoinput" && facing === (isFront ? "front" : "environment")) {
            videoSourceId = deviceId
        }
    })

    const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: {
            width: 640,
            height: 480,
            frameRate: 30,
            facingMode: isFront ? "user" : "environment",
            deviceId: videoSourceId
        }
    })
    return typeof stream !== "boolean" ? stream : null
}