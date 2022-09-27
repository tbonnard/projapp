import axios from 'axios'

const baseUrl = '/api/daily'

const getUserDaily = async (userToken, limit) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken }  }
  const response = await axios.get(`${baseUrl}/${limit}`, config)
  return response.data
}

const createDaily = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.post(`${baseUrl}`, itemObject, config)
  return response.data
}

const deactivateDaily = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}/deactivate`, itemObject, config)
  return response.data
}

const updateDaily = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}`, itemObject, config)
  return response.data
}


const updateDailyDate  = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}/updatedailydate`, itemObject, config)
  return response.data
}

const exportedObject = { getUserDaily, createDaily, deactivateDaily, updateDaily, updateDailyDate} 

export default exportedObject