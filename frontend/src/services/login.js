import axios from 'axios'

const baseUrl = '/api/login'

const loginUser = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

const exportedObject = { loginUser }
export default exportedObject
