import itemsServices from '../services/items'

export const defaultSelectedDiscItem = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const items = await itemsServices.getUserCategories(user.token)
        dispatch({
            type: "DEFAULT_SELECT_DISC_ITEM",
            data: items[0]
            })
    }
}

export const selectDiscItem = (item) => {
    return async dispatch => {
        if (!item) {
            item=null
        }
        dispatch({
            type: "SELECT_DISC_ITEM",
            data: item
            })
    }
}

export const unselectDiscItem = () => {
    return async dispatch => {
        dispatch({
            type: "UNSELECT_DISC_ITEM",
            data: null
            })
    }
}

const selectDiscussionItemReducer = (state=null, action) => {
    switch(action.type) {
        case 'SELECT_DISC_ITEM':
            return action.data
        case 'DEFAULT_SELECT_DISC_ITEM':
            return action.data
        case 'UNSELECT_DISC_ITEM':
            return action.data
        default:
            return state
    }
}

export default selectDiscussionItemReducer