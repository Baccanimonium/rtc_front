import {useMemo} from "react";
import {serverUrl, URL_FILE_FTP} from "../constants/ApiUrl";

export default (value) => {
    return useMemo(() => value ? `${serverUrl}/${URL_FILE_FTP}/${value}` : "", [value]);
}