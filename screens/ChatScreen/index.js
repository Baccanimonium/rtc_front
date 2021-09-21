import React, { useCallback, useContext, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from 'tailwind-react-native-classnames'
import { Button, Input, Image } from "react-native-elements";
import {SocketContext} from "../../constants/context";
import { v4 as uuidv4 } from 'uuid'
import {useRecoilValue} from "recoil";
import currentUserChannels from "./store";
import CurrentUserState from "../../store/user";



export default () => {
    const socketInstance = useContext(SocketContext);
    const channels = useRecoilValue(currentUserChannels)
    const {id: currUserId} = useRecoilValue(CurrentUserState)
    
    const userChannels = useMemo(() => channels.map(({ id, creator, participant }) =>({
      id, contact: creator === currUserId ? participant : creator
    })), [channels, currUserId]);
    const createChannel = useCallback(
        () => {
            socketInstance.send(JSON.stringify({
                type: "createChatChannel",
                payload: {
                    userId: 3,
                    messageId: uuidv4()
                }
            }))
        },
        [],
    );
    return (
        <View style={tw`bg-white h-full`}>
            <Text>Chat screen, реализация после основных API</Text>
            <Button onPress={createChannel} title="create channel"/>
            {userChannels.map(({id, contact }) => (
                <View key={id}>
                    <Text>{contact}</Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({

})

