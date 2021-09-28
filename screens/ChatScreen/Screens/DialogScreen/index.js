import React, {useState, useCallback, useContext, useEffect} from "react"
import "dayjs/locale/ru"
import {StyleSheet, Text, View} from "react-native"
import {GiftedChat} from 'react-native-gifted-chat'
import tw from 'tailwind-react-native-classnames'
import {SocketContext} from "../../../../constants/context";
import {useRecoilState, useRecoilValue} from "recoil";
import CurrentUserState from "../../../../store/user";
import {messagesSelector} from "../../store";
import api from "../../../../api";
import {URL_MESSAGES} from "../../../../constants/ApiUrl";
import useLoadChatParticipant from "../../useLoadChatParticipant";

export default ({route: {params: {userId, channelId}}}) => {
    const fetch = useRecoilValue(api)
    const userData = useRecoilValue(CurrentUserState)
    const socketInstance = useContext(SocketContext)
    const [messages, setMessages] = useRecoilState(messagesSelector(channelId))
    const chatParticipantLoader = useLoadChatParticipant()
    // const [messages, setMessages] = useState([{
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //     },
    // },
    // ]);

    useEffect(() => {
        (async () => {
            const rawData = await fetch(`${URL_MESSAGES}/${channelId}`, {
                method: 'GET',
            })

            setMessages(await Promise.all((await rawData.json()).map(chatParticipantLoader)))
        })()

    }, [channelId, chatParticipantLoader])

    const onSend = useCallback((messages = []) => {
        messages.forEach(({text}) => {
            socketInstance.send(({
                type: "createChatMessage",
                payload: {
                    creator: userData.id,
                    channelId,
                    text,

                }
            })).then(() => {
            })
        })
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
            locale="ru"
            scrollToBottom
            infiniteScroll
        />

    )
}

const styles = StyleSheet.create({})

