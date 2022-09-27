import dailyServices from '../services/daily'


export const getUserDaily = (limit) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const items = await dailyServices.getUserDaily(user.token, limit)
        dispatch({
            type: "GET_USER_DAILY",
            data: items
            })
    }
}


export const createDaily = (itemObject, limit) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const newItem = await dailyServices.createDaily(user.token, itemObject)
        const items = await dailyServices.getUserDaily(user.token, limit)
        dispatch({
            type: "NEW_DAILY",
            data: items
            })
    }
}

export const deactivateDaily = (itemObject, limit) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const deactivatedItem = await dailyServices.deactivateDaily(user.token, itemObject)
        const items = await dailyServices.getUserDaily(user.token, limit)
        dispatch({
            type: "DEACTIVATE_DAILY",
            data: items
            })
    }
}

export const updateDaily =  (itemObject, limit) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const updateNote = await dailyServices.updateDaily(user.token, itemObject)
        const items = await dailyServices.getUserDaily(user.token, limit)
        dispatch({
            type: "UPDATE_DAILY",
            data: items
            })
    }
}


export const updateDailyDate =  (itemObject, limit) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const updateDaily = await dailyServices.updateDailyDate(user.token, itemObject)
        const items = await dailyServices.getUserDaily(user.token, limit)
        dispatch({
            type: "UPDATE_DAILY_DATE",
            data: items
            })
    }
}

const dailyReducer = (state=[], action) => {
    switch(action.type) {
        case 'GET_USER_DAILY':
            return action.data
        case 'NEW_DAILY':
            return action.data
        case 'DEACTIVATE_DAILY':    
            return action.data
        case 'UPDATE_DAILY':    
            return action.data
        case 'UPDATE_DAILY_DATE':    
            return action.data
        default:
            return state
    }
}

export default dailyReducer