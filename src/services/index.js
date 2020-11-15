import Axios from "axios"

export async function PUT(url, data){
    return Axios.put(url, data, {
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
        },
        timeout: 30000
    })
}

export async function PUT_MULTIPART(url, data){
    return Axios.put(url, data, {
        headers: {
            Accept: 'application/json',
            'content-type': 'multipart/form-data'
        },
        timeout: 30000
    })
}

export async function POST(url, data){
    return Axios.post(url, data, {
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
        },
        timeout: 30000
    })
}

export async function DELETE(url){

    return Axios.delete(url,{
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
        },
        timeout: 30000
    })
}

export async function GET(url){
    return Axios.get(url, {
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
        },
        timeout: 30000
    })
}
