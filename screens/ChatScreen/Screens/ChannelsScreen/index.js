import 'react-native-get-random-values';
import React, {useCallback, useContext, useMemo} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import tw from 'tailwind-react-native-classnames'
import {Button, Input, Image, Avatar, } from "react-native-elements";
import {SocketContext} from "../../../../constants/context";
import {v4 as uuidv4} from 'uuid'
import {useRecoilValue} from "recoil";
import currentUserChannels from "../../store";
import CurrentUserState from "../../../../store/user";
import PersonProfile from "../../../../components/PersonProfile";
import {SCREEN_DIALOG} from "../../../../constants/ScreensNames";


export default ({navigation}) => {
    const socketInstance = useContext(SocketContext);
    const channels = useRecoilValue(currentUserChannels)
    const {id: currUserId} = useRecoilValue(CurrentUserState)

    const userChannels = useMemo(() => channels.map(({id, creator, participant}) => ({
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
            {userChannels.map(({id, contact}) => (
                <PersonProfile
                    id={contact}
                    key={id}
                >
                    {({loading, personProfile}) => (
                        <TouchableOpacity
                            key={id}
                            onPress={() => {
                                navigation.navigate(SCREEN_DIALOG, { userId: personProfile.id, channelId: id })
                            }}
                        >
                            <View style={tw`flex-row ml-3 mt-3`}>
                                <Avatar
                                    size="large"
                                    rounded
                                    icon={{name: 'user', type: 'font-awesome'}}
                                    source={loading ? undefined : {uri: personProfile.avatar}}
                                />
                                <View style={tw`ml-4`}>
                                    <Text style={tw`text-xl`}>{loading ? "loading" : personProfile.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                </PersonProfile>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({})

