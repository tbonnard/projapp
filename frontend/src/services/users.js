import axios from 'axios'

const baseUrl = '/api/users'


let token = null
const setToken = newToken => {  token = `bearer ${newToken}`}


const createAccount = async (accountObject) => {
  const response = await axios.post(baseUrl, accountObject)
  return response.data
}

const checkUsername = async (username) => {
  const response = await axios.get(`${baseUrl}/validate_username/${username}`)
  if (response.data.message === "username available") {return true} else {return false}
}


const exportedObject = { setToken, createAccount, checkUsername }

export default exportedObject