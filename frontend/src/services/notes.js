import axios from 'axios'

const baseUrl = '/api/notes'

const getUserNote = async (userToken) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken }  }
  const response = await axios.get(`${baseUrl}`, config)
  return response.data
}

const getUserNoteDate = async (userToken) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken }  }
  const response = await axios.get(`${baseUrl}/meetingdate`, config)
  return response.data
}

const getUserNoteDateCreated = async (userToken) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken }  }
  const response = await axios.get(`${baseUrl}/datecreated`, config)
  return response.data
}


const getNoteDetails = async (userToken, id) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken }  }
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const getSearchNotes = async (userToken, content) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken }  }
  const response = await axios.get(`${baseUrl}/search/${content}`, config)
  return response.data
}

const getNoteId = async (userToken, content) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken }  }
  const response = await axios.get(`${baseUrl}/${content}`, config)
  return response.data
}

const createNote = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.post(`${baseUrl}`, itemObject, config)
  return response.data
}

const deactivateNote = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}/deactivate`, itemObject, config)
  return response.data
}

const updateNote = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}`, itemObject, config)
  return response.data
}

const updateNoteProject = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}/updateproject`, itemObject, config)
  return response.data
}

const updateNoteMeetingNote = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}/updatemeetingnote`, itemObject, config)
  return response.data
}

const updateNoteMeetingDate  = async (userToken, itemObject) => {
  const finalToken = `bearer ${userToken}`
  const config = {    headers: { Authorization: finalToken } }
  const response = await axios.put(`${baseUrl}/updatemeetingdate`, itemObject, config)
  return response.data
}

const exportedObject = { getUserNote, getNoteId, createNote, getSearchNotes, deactivateNote, updateNote, updateNoteProject, getNoteDetails, updateNoteMeetingNote, updateNoteMeetingDate, getUserNoteDate, getUserNoteDateCreated} 

export default exportedObject