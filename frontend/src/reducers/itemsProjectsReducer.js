import projectsServices from '../services/projects'

export const getUserItemsProjects = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const itemProjects = await projectsServices.getItemsProjects(user.token)
        dispatch({
            type: "GET_USER_ITEM_PROJECTS",
            data: itemProjects
            })
    }
}

export const createItemProject = (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const newItemProject = await projectsServices.createItemProject(user.token, itemObject)
        const itemProjects = await projectsServices.getItemsProjects(user.token)
        dispatch({
            type: "NEW_ITEM_PROJECT",
            data: itemProjects
            })
    }
}

export const deactivateProject = (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const deactivatedItemProject = await projectsServices.deactivateItemProject(user.token, itemObject)
        const itemProjects = await projectsServices.getItemsProjects(user.token)
        dispatch({
            type: "DEACTVATE_ITEM_PROJECT",
            data: itemProjects
            })
    }
}

export const updateStatusItemProject = (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const updatedStatusItemProject = await projectsServices.updateStatusItemProject(user.token, itemObject)
        const itemProjects = await projectsServices.getItemsProjects(user.token)
        dispatch({
            type: "UPDATE_STATUS_ITEM_PROJECT",
            data: itemProjects
            })
    }
}

export const updateItemProjectProject = (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const updateditemProject = await projectsServices.updateItemProjectProject(user.token, itemObject)
        const itemProjects = await projectsServices.getItemsProjects(user.token)
        dispatch({
            type: "UPDATE_ITEM_PROJECT_PROJECT",
            data: itemProjects
            })
    }
}

export const updateItemProjectTitle = (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const updateditemProject = await projectsServices.updateItemProjectTitle(user.token, itemObject)
        const itemProjects = await projectsServices.getItemsProjects(user.token)
        dispatch({
            type: "UPDATE_ITEM_PROJECT_TITLE",
            data: itemProjects
            })
    }
}

export const archiveDoneItemsProjects = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const archiveitemProject = await projectsServices.archiveDoneItemProject(user.token)
        const itemProjects = await projectsServices.getItemsProjects(user.token)
        dispatch({
            type: "ARCHIVE_ITEM_PROJECT",
            data: itemProjects
            })
    }
}


const itemsProjectReducer = (state=[], action) => {
    switch(action.type) {
        case 'GET_USER_ITEM_PROJECTS':
            return action.data
        case 'NEW_ITEM_PROJECT':
            return action.data
        case 'DEACTVATE_ITEM_PROJECT':
            return action.data
        case 'UPDATE_STATUS_ITEM_PROJECT':
            return action.data
        case 'UPDATE_ITEM_PROJECT_PROJECT':
            return action.data
        case 'UPDATE_ITEM_PROJECT_TITLE':
            return action.data
        case 'ARCHIVE_ITEM_PROJECT':
            return action.data
        default:
            return state
    }

}

export default itemsProjectReducer