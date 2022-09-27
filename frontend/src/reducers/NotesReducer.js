import { selectNote } from './selectNoteReducer'
import { noteSavedReducer } from './selectNoteSavedReducer'
import { selectNoteIndicator } from './selectNoteIndicatorReducer'

import notesServices from '../services/notes'

export const getUserNote = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const items = await notesServices.getUserNote(user.token)
        dispatch({
            type: "GET_USER_NOTES",
            data: items
            })
    }
}

export const getUserNoteDate = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const items = await notesServices.getUserNoteDate(user.token)
        dispatch({
            type: "GET_USER_NOTES_DATE",
            data: items
            })
    }
}

export const getUserNoteDateCreated = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const items = await notesServices.getUserNoteDateCreated(user.token)
        dispatch({
            type: "GET_USER_NOTES_DATE_CREATED",
            data: items
            })
    }
}


export const getSearchNote = (content) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const items = await notesServices.getUserNote(user.token)
        const newState = items.filter(item => item.title.toLowerCase().includes(content.toLowerCase()) | item.description.toLowerCase().includes(content.toLowerCase()))  
        dispatch({
            type: "GET_SEARCH_NOTES",
            data: newState
            })
    }
}

export const createNote = (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const newItemNote = await notesServices.createNote(user.token, itemObject)
        const items = await notesServices.getUserNote(user.token)
        dispatch(selectNote(newItemNote))
        dispatch(noteSavedReducer())
        dispatch(selectNoteIndicator())
        dispatch({
            type: "NEW_NOTE",
            data: items
            })
    }
}

export const deactivateNote = (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const deactivatedItemNote = await notesServices.deactivateNote(user.token, itemObject)
        const items = await notesServices.getUserNote(user.token)
        dispatch({
            type: "DEACTVATE_NOTE",
            data: items
            })
    }
}

export const updateNote =  (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const updateNote = await notesServices.updateNote(user.token, itemObject)
        const items = await notesServices.getUserNote(user.token)
        dispatch({
            type: "UPDATE_NOTE",
            data: items
            })
    }
}

export const updateNoteProject =  (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const updateNote = await notesServices.updateNoteProject(user.token, itemObject)
        const items = await notesServices.getUserNote(user.token)
        dispatch({
            type: "UPDATE_PROJECT_NOTE",
            data: items
            })
    }
}

export const updateNoteMeetingNote =  (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const updateNote = await notesServices.updateNoteMeetingNote(user.token, itemObject)
        const items = await notesServices.getUserNote(user.token)
        dispatch({
            type: "UPDATE_PROJECT_MEETING_NOTE",
            data: items
            })
    }
}

export const updateNoteMeetingDate =  (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const updateNote = await notesServices.updateNoteMeetingDate(user.token, itemObject)
        const items = await notesServices.getUserNote(user.token)
        dispatch({
            type: "UPDATE_PROJECT_MEETING_DATE",
            data: items
            })
    }
}

const notesReducer = (state=[], action) => {
    switch(action.type) {
        case 'GET_USER_NOTES':
            return action.data
        case 'GET_USER_NOTES_DATE':
            return action.data
        case 'GET_USER_NOTES_DATE_CREATED':
            return action.data
        case 'NEW_NOTE':    
            return action.data
            //return [...state, action.data]
        case 'DEACTVATE_NOTE':    
            return action.data
        case 'UPDATE_PROJECT_NOTE':    
            return action.data
        case 'UPDATE_PROJECT_MEETING_NOTE':    
            return action.data
        case 'UPDATE_PROJECT_MEETING_DATE':    
            return action.data
        case 'GET_SEARCH_NOTES':
            return action.data
        case 'UPDATE_NOTE':    
            return action.data
        default:
            return state
    }
}

export default notesReducer