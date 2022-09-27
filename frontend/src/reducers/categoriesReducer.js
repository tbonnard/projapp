import itemsServices from '../services/items'
import { defaultSelectedDiscItem, selectDiscItem } from './selectDiscussionItemReducer'

export const getUserCategories = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const categories = await itemsServices.getUserCategories(user.token)
        dispatch({
            type: "GET_USER_CATEGORIES",
            data: categories
            })
    }
}

export const createUserCategory = (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const category = await itemsServices.createCategory(user.token, itemObject)
        const categories = await itemsServices.getUserCategories(user.token)
        dispatch(selectDiscItem(category))
        dispatch({
            type: "CREATE_USER_CATEGORIES",
            data: categories
            })
    }
}


export const updateItemDescriptionUserCategory = (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const category = await itemsServices.updateItemDescriptionUserCategory(user.token, itemObject)
        const categories = await itemsServices.getUserCategories(user.token)
        dispatch({
            type: "UPDATE_USER_CATEGORIES",
            data: categories
            })
    }
}

export const deactivateCategory = (itemObject, category) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const deactivatedCategory = await itemsServices.deactivateCategory(user.token, itemObject)
        const categories = await itemsServices.getUserCategories(user.token)
        dispatch(defaultSelectedDiscItem())
        dispatch({
            type: "DEACTVATE_CATEGORIES",
            data: categories
            })
    }
}

const categoriesReducer = (state=[], action) => {
    switch(action.type) {
        case 'GET_USER_CATEGORIES':
            return action.data
        case 'CREATE_USER_CATEGORIES':
            return action.data
        case 'DEACTVATE_CATEGORIES':
                return action.data
        case 'UPDATE_USER_CATEGORIES':
            return action.data
        default:
            return state
    }

}

export default categoriesReducer