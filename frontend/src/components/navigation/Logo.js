import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"

import { backListView } from '../../reducers/todoKanbanReducer'

import logo from '../../files/logo.svg';


const Logo = ({user}) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(backListView()) 
    }

    return (
        <div className='leftNav'>
            <div className='aroundLogo' onClick={handleClick}>
            {user === null ? 
              <Link to="/"><img className='logo' src={logo} alt='Logo' /></Link>
            :  <Link to="/app/todos"><img className='logo' src={logo} alt='Logo' /></Link>
            }
            </div>
        </div>  
    )
}

export default Logo