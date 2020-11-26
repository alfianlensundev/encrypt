import Axios from "axios";

export const validateEmail = (email) => (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
export const bytesToSize = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return bytes / Math.pow(1024, i) + ' ' + sizes[i];
 }

 export const downloadAs = (url, name) => {
    Axios.get(url, {
        headers: {
            "Content-Type": "application/octet-stream"
        },
        responseType: "blob"
    })
    .then(response => {
        const a = document.createElement("a");
        const url = window.URL.createObjectURL(response.data);
        a.href = url;
        a.download = name;
        a.click();
    })
    .catch(err => {
        console.log("error", err);
    }); 
 }