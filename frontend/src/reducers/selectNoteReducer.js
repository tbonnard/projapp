import notesServices from '../services/notes'

export const defaultSelectedNote = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const items = await notesServices.getUserNote(user.token)
        dispatch({
            type: "DEFAULT_SELECT_NOTE",
            data: items[0] | null
            })
    }
}

export const selectNote = (item) => {
    return async dispatch => {
        if (!item) {
            item=null
        }
        dispatch({
            type: "SELECT_NOTE",
            data: item
            })
    }
}

export const unselectNote = () => {
    return async dispatch => {
        dispatch({
            type: "UNSELECT_NOTE",
            data: null
            })
    }
}

const selectNoteReducer = (state=null, action) => {
    switch(action.type) {
        case 'SELECT_NOTE':
            return action.data
        case 'DEFAULT_SELECT_NOTE':
            return action.data
        case 'UNSELECT_NOTE':
            return action.data
        default:
            return state
    }
}

export default selectNoteReducer