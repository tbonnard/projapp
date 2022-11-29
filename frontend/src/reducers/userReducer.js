import { useHistory } from "react-router-dom";

import userServices from '../services/login'
import usersServices from '../services/users'

import { setNotification } from './notifReducer'

export const userLogin = (credentials) => {
    return async dispatch => {
        try {
            const user = await userServices.loginUser(credentials)
            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
            usersServices.setToken(user.token)
            dispatch({
                    type: "USER_LOGIN",
                    data: user
                })
        } catch(exception) {
            dispatch(setNotification({message:'wrong credentials, please try again', style:'error'}))
        }
    }
}

export const createAccount = (accountObject) => {
    return async dispatch => {
        try {
            const newUser = await usersServices.createAccount(accountObject)
            let user;
            if (newUser) {
                user = await userServices.loginUser({ email:accountObject.email, password:accountObject.password })
                window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
                usersServices.setToken(user.token)
            }
            dispatch({
                type: "USER_CREATE_ACCOUNT",
                data: user
            })
        } catch(exception) {
            dispatch(setNotification({message:'incorrect username or password (min 4 characters), please try again', style:'error'}))
        }
    }
}

export const getUserInfo = () =>{
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
        const user = await JSON.parse(loggedUserJSON)
        usersServices.setToken(user.token)
        dispatch({
            type: "GET_USER_INFO",
            data: user
            })
        }
    }
}

export const logoutUser = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedNoteappUser')
        dispatch({
            type: "LOGOUT_USER",
            data: null
            })
    }
}

export const userLoginDemo = () => {
    return async dispatch => {
        try {
            const user = await userServices.loginUserDemo()
            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
            usersServices.setToken(user.token)
            dispatch({
                    type: "USER_LOGIN_DEMO",
                    data: user
                })
        } catch(exception) {
            dispatch(setNotification({message:'wrong credentials, please try again', style:'error'}))
        }
    }
}

const userReducer = (state=null, action) => {
    switch(action.type) {
        case 'USER_LOGIN':
            return action.data
        case 'USER_LOGIN_DEMO':
            return action.data
        case 'GET_USER_INFO':
            return action.data
        case 'LOGOUT_USER':
            return action.data
        case 'USER_CREATE_ACCOUNT':
            return action.data
        default:
            return state
    }

}

export default userReducer