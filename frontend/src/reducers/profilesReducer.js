import profileServices from '../services/profile'

export const getUserProfiles = () =>{
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const profiles = await profileServices.getUserProfiles(user.token)
    dispatch({
            type: "GET_USER_PROFILES",
            data: profiles
            })
        }
    }

export const updateProfile = (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const updatedItemToDo = await profileServices.updateProfile(user.token, itemObject)
        const items = await profileServices.getUserProfiles(user.token)
        dispatch({
            type: "UPDATE_PROFILE",
            data: items
            })
    }
}

export const deactivateProfile = (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const deactivatedItemToDo = await profileServices.deactivateProfile(user.token, itemObject)
        const items = await profileServices.getUserProfiles(user.token)
        dispatch({
            type: "DEACTVATE_PROFILE",
            data: items
            })
    }
}

export const createProfile = (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const profile = await profileServices.createProfile(user.token,itemObject)
        const profiles = await profileServices.getUserProfiles(user.token)
        getUserProfiles()
        dispatch({
            type: "CREATE_PROFILE",
            data: profiles
        })
    }
}


const profileReducer = (state=null, action) => {
    switch(action.type) {
        case 'GET_USER_PROFILES':
            return action.data
        case 'UPDATE_PROFILE':
            return action.data
        case 'DEACTVATE_PROFILE':
            return action.data
        case "CREATE_PROFILE":
            return action.data
        default:
            return state
    }

}

export default profileReducer