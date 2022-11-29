import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Switch,
  Route,
  Redirect
} from "react-router-dom"

import { getUserInfo } from './reducers/userReducer'
import { getCurrentProfile } from './reducers/profileCurrentReducer'
import { setMenuMobileView } from './reducers/menuExpandCollapseReducer'

import Notification from "./components/Notification"
import LoginForm from './components/login/LoginForm'
import AccountForm from './components/login/AccountForm'
import UserInfo from './components/login/UserInfo'
import MenuNav from './components/navigation/MenuNav'
import Items from './components/item/Items'
import Projects from './components/project/Projects'
import ToDos from './components/todo/ToDos'
import Notes from './components/note/Notes'
import ProjectsSetup from './components/projectsSetup/ProjectsSetup'
import Dailys from './components/daily/Dailys'
import ToDoRightColumn from './components/todo/ToDoRightColumn'
import DailyRightColumn from './components/daily/DailyRightColumn'
import NoteRightColumn from './components/note/NoteRightColumn'
import ProjectStatusRightColumn from './components/project/ProjectStatusRightColumn'
import ItemsRightColumn from './components/item/ItemsRightColumn'
import HomePage from './components/home/HomePage'

//const TRACKING_ID = "G-GRMLYZF5DP"; // GA+TRACKING_ID

const App = () => {

  const dispatch = useDispatch()

  const menuView = useSelector(state => state.menuExpandCollapse)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getUserInfo())
    if (window.innerWidth < 800) {
      dispatch(setMenuMobileView())
    }
  }, [dispatch])


  useEffect(() => {
    if (user) {
      dispatch(getCurrentProfile())
    }
  }, [dispatch,user])


  return (
    <div className='initGrid initContainer'>
    
      <MenuNav user={user}/>

      <Switch>

        <Route path='/app/profile'>
            {user === null? <Redirect to="/" /> : <UserInfo /> }         
          </Route>

        <Route path='/signin'>
          {user === null ? <LoginForm /> : <Redirect to="/app/profile" />}         
        </Route>

        <Route path='/signup'>
          {user === null ? <AccountForm /> : <Redirect to="/app/profile" />}      
        </Route>
 
        <Route path='/app/daily'>
          {user !== null ? <><Dailys /><DailyRightColumn /></>  : <Redirect to="/signin" />}      
        </Route>

        <Route path='/app/notes'>          
          {user !== null ? <><Notes menuView={menuView} /><NoteRightColumn /></>  : <Redirect to="/signin" />}      
        </Route>

        <Route path='/app/todos'>
          {user !== null ? <><ToDos /><ToDoRightColumn /></>  : <Redirect to="/signin" />}      
        </Route>
        
        <Route path='/app/items'>
          {user !== null ? <><Items menuView={menuView} /><ItemsRightColumn /></>  : <Redirect to="/signin" />}      
        </Route>

        <Route path='/app/status'>
            {user !== null ? <><Projects /><ProjectStatusRightColumn /></>  : <Redirect to="/signin" />}      
        </Route>

        <Route path='/app/setup' >
          {user !== null ? <><ProjectsSetup /></>  : <Redirect to="/signin" />}      
        </Route>

        <Route path='/' >
          {/* <HomePage /> */}
          <Redirect to="/signin" />
        </Route>


      </Switch>

    </div>

  )
}

export default App;
