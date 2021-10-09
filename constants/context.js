import React from 'react'

export const SocketContext = React.createContext(null);
export const UserProfileLoader = React.createContext((id) => id);
export const RTCContext = React.createContext({});