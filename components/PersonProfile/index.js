import React, {useContext, useEffect, useState} from "react";
import {UserProfileLoader} from "../../constants/context";

const PersonProfile = ({ id, children }) => {
    const [personProfile, setPersonProfile] = useState({})
    const [loading, setLoadingStatus] = useState(false)
    const getUserProfile = useContext(UserProfileLoader)

    useEffect(() => {
        (async () => {
            setLoadingStatus(true)
            const profile = await getUserProfile(id)
            setPersonProfile(profile)
            setLoadingStatus(false)
        })()
    }, [id])
    return children({ loading, personProfile })
}

export default PersonProfile