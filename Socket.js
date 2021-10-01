import 'react-native-get-random-values';
import {v4 as uuidv4} from "uuid";
import React, {useEffect, useState, useRef} from "react";
import {useRecoilValue} from "recoil";
import tokenState from "./store/token";
import { SocketContext } from "./constants/context";
import { BACK_END_URL } from "./constants/backEndUrl";


const messagesPull = {}

export const Socket = ({ children, messageHandlers }) => {
    const {token} = useRecoilValue(tokenState)

    const [socketInstance, setSocketInstance] = useState(null)
    const socketRef = useRef(null)
    socketRef.current = socketInstance

    const socketHandlersRef = useRef(messageHandlers)
    socketHandlersRef.current = socketInstance

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.close()
            setSocketInstance(null)
        }
        if (token) {
            socketRef.current = new WebSocket(`ws://${BACK_END_URL}/websocket?authorization=${token}`);
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
                console.log("open", args)
                // connection opened  socketRef.current.send('something'); // send a message};
            }
            socketRef.current.onmessage = (e) => {
                const { messageId, type, payload } = JSON.parse(e.data)
                console.log('asd2', messageId, type, payload)
                if (messageId && messagesPull[messageId]) {
                    messagesPull[messageId].resolve(payload)
                    delete messagesPull[messageId]
                } else {
                    if (socketHandlersRef.current[type]) {
                        socketHandlersRef.current[type](payload)
                    }
                }
                // a message was received  console.log(e.data);};
            }
            socketRef.current.onerror = (e) => {
                // an error occurred  console.log(e.message);};
            }
            socketRef.current.onclose = (e) => {
                console.log("close")
                // connection closed  console.log(e.code, e.reason);};
            }
            setSocketInstance(socketRef.current)
        }
    }, [token])


    return  <SocketContext.Provider value={socketInstance}>
        {children}
    </SocketContext.Provider>
}
