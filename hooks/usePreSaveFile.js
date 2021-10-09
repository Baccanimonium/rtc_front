import {useRecoilValue} from "recoil";
import api from "../api";
import {URL_FILE_UPLOAD} from "../constants/ApiUrl";
import {useCallback} from "react";

export default (imageKey) => (saveFunc) => {
    const fetch = useRecoilValue(api)

    const handleUploadFile = useCallback(async (file) => {
        try {
            const uriParts = file.split('.');
            const fileType = uriParts[uriParts.length - 1];

            const formData = new FormData();
            formData.append('file', {
                uri: file,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            });

            const {fileName} = (await fetch(URL_FILE_UPLOAD, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })).json()

            return fileName
        } catch (e) {
            console.log('failed upload image operation: ', e.response)
        }
    }, [fetch])

    return async (value) => {
        return saveFunc({
            ...value,
            [imageKey]: await handleUploadFile(value[imageKey])
        })
    }
}