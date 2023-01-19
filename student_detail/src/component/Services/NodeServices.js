import axios from "axios"

const serverURL = "http://localhost:5000"

const postData = async (url, body, isFile = false) => {
    try {
        var response = await axios.post(`${serverURL}/${url}`, body)
        var result = await response.data
        return (result)
    }
    catch (error) {
        console.log(error)
        return (false)
    }
}

const getData = async (url) => {
    try {
        var response = await fetch(`${serverURL}/${url}`)
        var result = await response.json()

        return (result)
    }
    catch (e) {

        return (null)
    }
}

export { serverURL, postData, getData }