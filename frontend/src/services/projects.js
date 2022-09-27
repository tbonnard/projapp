import axios from 'axios'

const baseUrl = '/api/projects'

const getUserStatus = async (userToken) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken }  }
  const response = await axios.get(`${baseUrl}/statusproject`, config)
  return response.data
}

const getUserProjects = async (userToken) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken }  }
  const response = await axios.get(`${baseUrl}/userproject`, config)
  return response.data
}

const createProject = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.post(`${baseUrl}/userproject`, itemObject, config)
  return response.data
}

const deactivateProject = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}/userprojectdeactivate`, itemObject, config)
  return response.data
}

const updateColorProject = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}/userprojectcolor`, itemObject, config)
  return response.data
}

const updateTitleProject = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}/userprojecttitle`, itemObject, config)
  return response.data
}


const getItemsProjects = async (userToken) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken }  }
  const response = await axios.get(`${baseUrl}`, config)
  return response.data
}

const createItemProject = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.post(`${baseUrl}`, itemObject, config)
  return response.data
}

const deactivateItemProject = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}/deactivate`, itemObject, config)
  return response.data
}

const updateStatusItemProject = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}/updatestatus`, itemObject, config)
  return response.data
}


const updateItemProjectProject = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}/updateitemprojectproject`, itemObject, config)
  return response.data
}


const updateItemProjectTitle = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}`, itemObject, config)
  return response.data
}

const archiveDoneItemProject = async (userToken) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const itemObject = {}
  const response = await axios.put(`${baseUrl}/itemsdone`, itemObject, config)
  return response.data
}

const exportedObject = { getUserStatus, getUserProjects, createProject, deactivateProject, getItemsProjects, createItemProject, deactivateItemProject, updateStatusItemProject, updateColorProject, updateTitleProject, updateItemProjectProject, updateItemProjectTitle, archiveDoneItemProject}

export default exportedObject