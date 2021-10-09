import {RTCContext} from "../constants/context";
import React, {useState, useCallback, useMemo, useRef} from "react";

export default ({ children }) => {
    const refPc = useRef()
    const [rtcState, setRtcState] = useState({ pc: refPc })

    const updateContext = useCallback(({pc, ...newState}) => {
        if (pc) {
            refPc.current = pc
        }
        setRtcState((prevState => ({...prevState, ...newState})))
    },[])

    const providerValue = useMemo(() => ({ ...rtcState, updateContext }), [rtcState])

    return <RTCContext.Provider value={providerValue}>
        {children}
    </RTCContext.Provider>
}