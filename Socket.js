import 'react-native-get-random-values';
import {v4 as uuidv4} from "uuid";
import React, {useEffect, useState, useRef} from "react";
import {useRecoilValue} from "recoil";
import tokenState from "./store/token";
import { SocketContext } from "./constants/context";
import useCreateRTCPeerConnection from "./RTC/useCreateRTCPeerConnection";

const messagesPull = {}

export const Socket = ({ children, messageHandlers }) => {
    const createConnection = useCreateRTCPeerConnection()
    const {token} = useRecoilValue(tokenState)

    const [socketInstance, setSocketInstance] = useState(null)
    const socketRef = useRef(null)
    socketRef.current = socketInstance

    const socketHandlersRef = useRef(messageHandlers)
    socketHandlersRef.current = messageHandlers

    useEffect(() => {
        (async () => {
            if (socketRef.current) {
                socketRef.current.close()
                setSocketInstance(null)
            }
            if (token) {
                const applySocketInstance = await createConnection()
                socketRef.current = new WebSocket(`ws://192.168.50.249:8000/websocket?authorization=${token}`);
                setSocketInstance(socketRef.current)
                socketRef.current.send = new Proxy(socketRef.current.send, {
                    apply(target, thisArg, [payload]) {
                        const messageId = uuidv4()
                        target.apply(thisArg, [JSON.stringify({ ...payload, messageId })])
                        return new Promise((resolve, reject) => {
                            messagesPull[messageId] = { resolve, reject }
                        })
                    }
                })

                socketRef.current.onopen = (args) => {
                    console.log("Websocket has opened")
                    // connection opened  socketRef.current.send('something'); // send a message};
                }
                socketRef.current.onmessage = (e) => {
                    const { messageId, type, payload } = JSON.parse(e.data)
                    // console.log('asd2', messageId, type, payload)
                    if (messageId && messagesPull[messageId]) {
                        messagesPull[messageId].resolve(payload)
                        delete messagesPull[messageId]
                    } else {
                        if (socketHandlersRef.current[type]) {
                            socketHandlersRef.current[type](JSON.parse(payload), socketRef.current)
                        }
                    }
                    // a message was received  console.log(e.data);};
                }
                socketRef.current.onerror = (e) => {
                    // an error occurred  console.log(e.message);};
                }
                socketRef.current.onclose = (e) => {
                    console.log("Websocket has closed")
                    // connection closed  console.log(e.code, e.reason);};
                }
                applySocketInstance(socketRef.current)


            }
        })()
    }, [token])


    return  <SocketContext.Provider value={socketInstance}>
        {children}
    </SocketContext.Provider>
}