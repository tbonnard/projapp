import itemsServices from '../services/items'

export const getUserItemsCategory = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const items = await itemsServices.getUserItemsCategory(user.token)
        dispatch({
            type: "GET_USER_ITEMS_CATEGORIES",
            data: items
            })
    }
}


export const getUserItemsOneCategory = (categoryId) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const items = await itemsServices.getUserItemsOneCategory(user.token, categoryId)
        dispatch({
            type: "GET_USER_ITEMS_ONE_CATEGORIES",
            data: items
            })
    }
}

export const createItemCategory = (itemObject,category) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const newItemCategory = await itemsServices.createItemCategory(user.token, itemObject)
        const items = await itemsServices.getUserItemsOneCategory(user.token, category.id)
        dispatch({
            type: "NEW_ITEMS_CATEGORIES",
            data: items
            })
    }
}

export const deactivateItemCategory = (itemObject, category) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const deactivatedItemCategory = await itemsServices.deactivateItemCategory(user.token, itemObject)
        const items = await itemsServices.getUserItemsOneCategory(user.token, category)
        dispatch({
            type: "DEACTVATE_ITEMS_CATEGORIES",
            data: items
            })
    }
}

export const updateItemCategory = (itemObject, category) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const updatedItemCategory = await itemsServices.updateItemCategory(user.token, itemObject)
        const items = await itemsServices.getUserItemsOneCategory(user.token, category)
        dispatch({
            type: "UPDATED_ITEMS_CATEGORIES",
            data: items
            })
    }
}

const itemsCategoriesReducer = (state=[], action) => {
    switch(action.type) {
        case 'GET_USER_ITEMS_ONE_CATEGORIES':
            return action.data
        case 'GET_USER_ITEMS_CATEGORIES':
            return action.data
        case 'NEW_ITEMS_CATEGORIES':    
            return action.data
        case 'UPDATED_ITEMS_CATEGORIES':    
            return action.data
            //return [...state, action.data]
        case 'DEACTVATE_ITEMS_CATEGORIES':    
            return action.data
        default:
            return state
    }
}

export default itemsCategoriesReducer