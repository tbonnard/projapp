import axios from 'axios'

const baseUrl = '/api/profile'

const getCurrentUserProfile = async (userToken) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken }  }
  const response = await axios.get(`${baseUrl}/current`, config)
  return response.data
}

const getUserProfiles = async (userToken) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.get(`${baseUrl}`, config)
  return response.data
}

const createProfile = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.post(`${baseUrl}`, itemObject, config)
  return response.data
}

const deactivateProfile = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}/deactivate`, itemObject, config)
  return response.data
}

const updateProfile = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}`, itemObject, config)
  return response.data
}

const changeCurrentProfile = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}/changecurrent`, itemObject, config)
  return response.data
}

const exportedObject = { getCurrentUserProfile, getUserProfiles, createProfile, deactivateProfile, updateProfile, changeCurrentProfile}

export default exportedObject