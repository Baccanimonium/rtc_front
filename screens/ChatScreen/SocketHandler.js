import React, {useCallback, useMemo, useRef} from "react";
import {useRecoilState} from "recoil";
import currentUserChannels, {messagesStore} from "./store";
import useLoadChatParticipant from "./useLoadChatParticipant";
import {
    ON_DELETE_CHANNEL,
    ON_DELETE_CHAT_MESSAGE,
    ON_NEW_CHANNEL,
    ON_NEW_CHAT_MESSAGE,
    ON_UPDATE_CHAT_MESSAGE
} from "./constants";

export default (ChildComponent) => ({ messageHandlers, ...props }) => {
    const [allMessages, setMessagesState] = useRecoilState(messagesStore)
    const refAllMessages = useRef(allMessages)
    refAllMessages.current = allMessages

    const [allChannels, setChannelsState] = useRecoilState(currentUserChannels)
    const refAllChannels = useRef(allChannels)
    refAllChannels.current = allChannels

    const chatParticipantLoader = useLoadChatParticipant()

    const onChatMessage = useCallback(async (message) => {
        // ignore messages from chats which we haven't visit yet
        if (refAllMessages.current[message.channelId]) {
            const messageWithUserState = await chatParticipantLoader(message)

            setMessagesState({
                ...allMessages,
                [message.channelId]: [...allMessages[message.channelId], messageWithUserState]
            })
        }
    }, [chatParticipantLoader])

    const onChatMessageUpdate = useCallback((message) => {
        // ignore messages from chats which we haven't visit yet
        if (refAllMessages.current[message.channelId]) {
            const newMessagesSlice = [...allMessages[message.channelId]]
            const indexOfUpdatedMessage = newMessagesSlice.findIndex(({ _id }) => _id === message._id)
            newMessagesSlice.splice(indexOfUpdatedMessage, 1, {
                ...newMessagesSlice[indexOfUpdatedMessage],
                text: message.text,
                updated: message.updated,
                files: message.files
            })
            setMessagesState({
                ...allMessages,
                [message.channelId]: newMessagesSlice
            })
        }
    }, [])

    const onChatMessageDelete = useCallback((message) => {
        // ignore messages from chats which we haven't visit yet
        if (refAllMessages.current[message.channelId]) {
            const newMessagesSlice = [...allMessages[message.channelId]]
            const indexOfUpdatedMessage = newMessagesSlice.findIndex(({ _id }) => _id === message._id)
            newMessagesSlice.splice(indexOfUpdatedMessage, 1)

            setMessagesState({
                ...allMessages,
                [message.channelId]: newMessagesSlice
            })
        }
    }, [])

    const onNewChannel = useCallback((channel) => {
        setChannelsState({...refAllChannels, [channel.id]: channel })
    }, [])

    const onDeleteChannel = useCallback((channel) => {
        const nextChannelState = {...refAllChannels, [channel.id]: channel }
        delete nextChannelState[channel._id]
        setChannelsState(nextChannelState)
    }, [])

    const chatHandlers = useMemo(
        () => ({
            ...messageHandlers,
            [ON_NEW_CHAT_MESSAGE]: onChatMessage,
            [ON_UPDATE_CHAT_MESSAGE]: onChatMessageUpdate,
            [ON_DELETE_CHAT_MESSAGE]: onChatMessageDelete,
            [ON_DELETE_CHANNEL]: onDeleteChannel,
            [ON_NEW_CHANNEL]: onNewChannel
        }),
        [messageHandlers, onChatMessage]
    )


    return <ChildComponent
        {...props}
        messageHandlers={chatHandlers}
    />
}