import React from 'react'
import {View, Text} from "react-native";
import { Avatar } from "react-native-elements";

import tw from 'tailwind-react-native-classnames'
import useGetImageUrl from "../../hooks/useGetImageUrl";

const UserProfile = ({ avatar, name , loading, children, size }) => {
    const normalizedLink = useGetImageUrl(avatar)

    return (
        <View style={tw`flex-row ml-3 mt-3  w-full`}>
            <Avatar
                size={size}
                rounded
                icon={{name: 'user', type: 'font-awesome'}}
                source={loading ? undefined : {uri: normalizedLink}}
            />
            <View style={tw`ml-4`}>
                <Text style={tw`text-xl`}>{loading ? "loading" : name}</Text>
                {children}
            </View>
        </View>
    )
}

export default UserProfile


UserProfile.defaultProps = {
    size: "large"
};