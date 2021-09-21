import React, {useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from 'tailwind-react-native-classnames'
import UploadImage from "../components/ImagesUploader";
import {useRecoilState, useRecoilValue} from "recoil";
import api from "../api";
import {URL_FILE_UPLOAD} from "../constants/ApiUrl";
import { Button, Input, Image } from "react-native-elements";
import {tokenAtom} from "../store/user";


const createFormData = (photo, body = {}) => {


    data.append('file', {
        name: photo.fileName,
        type: photo.type,
        uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
    });

    return data;
};

export default () => {
    const [image, setImage] = useState(null);
    const token = useRecoilValue(tokenAtom)

    const handleUploadPhoto = async () => {
        try {

            let uriParts = image.uri.split('.');
            let fileType = uriParts[uriParts.length - 1];

            let formData = new FormData();
            formData.append('file', {
                uri: image.uri,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            });


            fetch(`http://192.168.50.249:8000/api/upload`, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => response.json())
                .then((response) => {
                    console.log('response', response);
                })
                .catch((error) => {
                    console.log('error', error);
                });
            // const body = new FormData();

            // console.log({
            //     uri: image.uri,
            //     type: image.type,
            //     name: (() => {
            //         const path = image.uri.split("/")
            //         return path[path.length - 1]
            //     })()
            // })
            // console.log(image)
            // body.append('file', {
            //     uri: image.uri,
            //     type: image.type,
            //     name: (() => {
            //         const path = image.uri.split("/")
            //         return path[path.length - 1]
            //     })()
            // })
            // const xhr = new XMLHttpRequest()
            // xhr.addEventListener("load", () => {
            //     console.log(xhr.response)
            // })
            // xhr.addEventListener("error", () => {
            //     console.log(xhr.response)
            // })
            // xhr.open("POST",`http://192.168.50.249:8000/${URL_FILE_UPLOAD}`)
            // xhr.onerror = function (e) {
            //     console.log("1** An error occurred during the transaction", xhr);
            // };
            // xhr.setRequestHeader("Authorization", `Bearer ${token}`)
            // xhr.setRequestHeader("Content-Type", 'multipart/form-data')
            // xhr.send(body)
            // fetch(URL_FILE_UPLOAD, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     },
            //     body,
            // })
            //     .then((response) => response.json())
            //     .then((response) => {
            //         console.log('response', response);
            //     })
            //     .catch((error) => {
            //         console.log('error', error.line);
            //     });
        } catch (e){
            console.log('failed upload image operation: ', e.response)
        }
    };
    return (
        <View style={tw`bg-white h-full`}>
            <Text>MyProfile screen, реализация после основных API</Text>
            <UploadImage image={image} setImage={setImage} />

            <Button title="upload" onPress={handleUploadPhoto}/>
        </View>
    )
}

const styles = StyleSheet.create({

})

