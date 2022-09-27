import notesServices from '../services/notes'
import { selectNote } from './selectNoteReducer'


export const getNote = (id) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const item = await notesServices.getNoteId(user.token, id)
        dispatch(selectNote(item))
        dispatch({
            type: "GET_NOTE",
            data: item
            })
    }
}

export const unGetNote = () => {
    return async dispatch => {
        dispatch({
            type: "UNGET_NOTE",
            data: null
            })
    }
}

const getNoteReducer = (state=null, action) => {
    switch(action.type) {
        case 'GET_NOTE':
            return action.data
        case 'UNGET_NOTE':
            return action.data
        default:
            return state
    }
}

export default getNoteReducer