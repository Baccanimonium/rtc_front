import React, {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import api from "../api";
import {serverUrl, URL_FILE_FTP, URL_USER} from "../constants/ApiUrl";
import {UserProfileLoader} from "../constants/context";


const stateExtractor = async (state, userID) => {
    const {[userID]: currentUserState} = await state
    return currentUserState
}

class Hub {
    constructor(fetch) {
        this.fetch = fetch // fetch with token
        this.timeout = null // timeout for start next req
        this.resolve = null // resolve current request
        this.reject = null // reject current request
        this.nextPull = {} // next pull of required ids
        this.currentPull = {} // current pull of required ids
        this.totalPull = {} // summary of all requests
        this.nextRequest = null
        this.currentRequest = null
        this.usersLoader() // instantiate next req
    }

    usersLoader = () => {
        this.nextRequest = new Promise((resolve, reject) => {
            this.resolve = resolve
            this.reject = reject
        })
    }

    getUser = async (userId) => {
        // try to get data from previous req
        if (this.totalPull[userId]) {
            return this.totalPull[userId]
            // try to get data from curr req
        } else if (this.currentPull[userId]) {
            return stateExtractor(this.currentRequest, userId)
        } else {
            // queue next req
            if (!this.nextPull[userId]) {
                this.nextPull[userId] = 1
            }
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => this.runUpload(), 50)
            return stateExtractor(this.nextRequest, userId)
        }
    }

    runUpload = async () => {
        // wait for previous req
        await this.currentRequest
        // override prev request by current
        this.currentRequest = this.nextRequest
        const resolve = this.resolve
        const reject = this.reject
        // instantiate next request
        this.usersLoader()
        const pull = Object.keys(this.nextPull).join(",")
        this.currentPull = this.nextPull
        try {
            const data = await this.fetch(`${URL_USER}?ids=${pull}`, {method: "GET"})
            // prepare data for easy reading for personal requests
            resolve((await data.json()).reduce((acc, item) => {
                item.avatar = `${serverUrl}/${URL_FILE_FTP}/${item.avatar}`
                acc[item.id] = item
                this.totalPull[item.id] = item
                return acc
            }, {}))
        } catch (e) {
            reject()
        }
    }

    setFetch = (fetch) => {
        this.fetch = fetch
    }
}


const UserProfileLoaderContainer = ({ children }) => {
    const [hub, setHub] = useState(null)
    const fetch = useRecoilValue(api)

    useEffect(() => {
        if (hub) {
            hub.setFetch(fetch)
        } else {
            setHub(new Hub(fetch))
        }
    }, [fetch])

    return <UserProfileLoader.Provider value={hub && hub.getUser}>
        {children}
    </UserProfileLoader.Provider>

}


export default UserProfileLoaderContainer