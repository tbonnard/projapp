import axios from 'axios'

const baseUrl = '/api/login'

const loginUser = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

const loginUserDemo = async () => {
    const response = await axios.post(`${baseUrl}/demo`)
    return response.data
}

const exportedObject = { loginUser, loginUserDemo }
export default exportedObject
