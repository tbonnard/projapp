import axios from 'axios'

const baseUrl = '/api/items'

const getUserCategories = async (userToken) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken }  }
  const response = await axios.get(`${baseUrl}/categories`, config)
  return response.data
}

const createCategory = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.post(`${baseUrl}/category`, itemObject, config)
  return response.data
}

const deactivateCategory = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}/category/deactivate`, itemObject, config)
  return response.data
}

const updateItemDescriptionUserCategory = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}/category/update`, itemObject, config)
  return response.data
}

const getUserItemsCategory = async (userToken) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken }  }
  const response = await axios.get(`${baseUrl}`, config)
  return response.data
}

const getUserItemsOneCategory = async (userToken, categoryId) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken }  }
  const response = await axios.get(`${baseUrl}/onecategory/${categoryId}`, config, )
  return response.data
}

const createItemCategory = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.post(`${baseUrl}`, itemObject, config)
  return response.data
}

const deactivateItemCategory = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}/deactivate`, itemObject, config)
  return response.data
}

const updateItemCategory = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}`, itemObject, config)
  return response.data
}

const exportedObject = { getUserCategories, createCategory, deactivateCategory, updateItemDescriptionUserCategory, getUserItemsCategory, getUserItemsOneCategory, createItemCategory, deactivateItemCategory, updateItemCategory }

export default exportedObject