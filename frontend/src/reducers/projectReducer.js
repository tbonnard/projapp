import projectsServices from '../services/projects'

export const getUserProjects = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const projects = await projectsServices.getUserProjects(user.token)
        dispatch({
            type: "GET_USER_PROJECTS",
            data: projects
            })
    }
}

export const createProject = (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const newProject = await projectsServices.createProject(user.token, itemObject)
        const projects = await projectsServices.getUserProjects(user.token)
        dispatch({
            type: "NEW_PROJECT",
            data: projects
            })
    }
}

export const deactivateProject = (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const deactivatedProject = await projectsServices.deactivateProject(user.token, itemObject)
        const projects = await projectsServices.getUserProjects(user.token)
        dispatch({
            type: "DEACTVATE_PROJECT",
            data: projects
            })
    }
}


export const updateColorProject = (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const deactivatedProject = await projectsServices.updateColorProject(user.token, itemObject)
        const projects = await projectsServices.getUserProjects(user.token)
        dispatch({
            type: "UPDATE_COLOR_PROJECT",
            data: projects
            })
    }
}

export const updateTitleProject = (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const deactivatedProject = await projectsServices.updateTitleProject(user.token, itemObject)
        const projects = await projectsServices.getUserProjects(user.token)
        dispatch({
            type: "UPDATE_TITLE_PROJECT",
            data: projects
            })
    }
}

const projectsReducer = (state=[], action) => {
    switch(action.type) {
        case 'GET_USER_PROJECTS':
            return action.data
        case 'NEW_PROJECT':
            return action.data
        case 'UPDATE_TITLE_PROJECT':
                return action.data
        case 'UPDATE_COLOR_PROJECT':
                return action.data
        case 'DEACTVATE_PROJECT':
            return action.data
        default:
            return state
    }

}

export default projectsReducer