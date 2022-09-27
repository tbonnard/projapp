import axios from 'axios'

const baseUrl = '/api/todos'

const getUserItemsTodo = async (userToken) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken }  }
  const response = await axios.get(`${baseUrl}`, config)
  return response.data
}

const createItemTodo = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.post(`${baseUrl}`, itemObject, config)
  return response.data
}

const deactivateItemTodo = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}/deactivate`, itemObject, config)
  return response.data
}

const updateItemTodo = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}`, itemObject, config)
  return response.data
}


const updateItemTodoProject = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}/updateproject`, itemObject, config)
  return response.data
}

const updateItemTodoStatus = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}/updatestatus`, itemObject, config)
  return response.data
}

const updateToDoOrder  = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}/updateorder`, itemObject, config)
  return response.data
}

const archiveDoneToDos =  async (userToken) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const itemObject = {}
  const response = await axios.put(`${baseUrl}/todosdone`, itemObject, config)
  return response.data
}

const exportedObject = {archiveDoneToDos,  getUserItemsTodo, createItemTodo, deactivateItemTodo, updateItemTodo,updateItemTodoProject, updateItemTodoStatus,updateToDoOrder }

export default exportedObject