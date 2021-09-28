import dayjs from "dayjs"
import {useCallback, useContext} from "react";
import {UserProfileLoader} from "../../constants/context";

export default () => {
    const getUserProfile = useContext(UserProfileLoader)

    return useCallback((message) => {
        return new Promise(async resolve => {
            const {name, id, avatar} = await getUserProfile(message.creator)

            resolve({
                ...message,
                createdAt: dayjs(message.created, "DD.MM.YYYY HH:mm:ss").toDate(),
                user: {name, avatar, _id: id}
            })
        })
    },[])
}