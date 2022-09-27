import projectsServices from '../services/projects'

export const getUserStatus = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const status = await projectsServices.getUserStatus(user.token)
        dispatch({
            type: "GET_USER_STATUS",
            data: status
            })
    }
}

const statusReducer = (state=[], action) => {
    switch(action.type) {
        case 'GET_USER_STATUS':
            return action.data
        default:
            return state
    }

}

export default statusReducer