import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { useLocation } from 'react-router-dom'

import MenuNavExpand from "./MenuNavExpand";
import MenuNavCollapse from "./MenuNavCollapse";
import { setMenuMobileView } from "../../reducers/menuExpandCollapseReducer";


const MenuNav = ({user}) => {
    const dispatch = useDispatch()
    let location = useLocation();

    const menuView = useSelector(state => state.menuExpandCollapse)


    useEffect(() => {
        let navDiv = document.querySelector('.nav')
        if (!menuView.left && navDiv) {
            navDiv.className='nav navAnim'       
        } 
      }, [dispatch, menuView])


      if (!location.pathname.includes('/app/')) {
        return null
      } 
      
      else if (window.innerWidth < 600) {
        return <> {<MenuNavCollapse user={user} menuView={menuView}/> } </>
      } 

    
    else return (
        <>
            {menuView.left ? <MenuNavExpand user={user} menuView={menuView}/> : <MenuNavCollapse user={user} menuView={menuView}/> }
        </>
    )
}

export default MenuNav