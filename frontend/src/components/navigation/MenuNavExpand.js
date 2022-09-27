import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { Link } from "react-router-dom"

import Logo from './Logo'

import todoIcon from '../../files/todo.svg';
import dailyIcon from '../../files/daily.svg';
import noteIcon from '../../files/note.svg';
import discitemIcon from '../../files/discitem.svg';
import fileIcon from '../../files/file.svg';
import accountIcon from '../../files/account.svg';
import collapseIcon from '../../files/collapse.svg';
import { changeMenuView } from "../../reducers/menuExpandCollapseReducer";

const MenuNavExpand = ({user, menuView}) => {
    const dispatch = useDispatch()

    const profile = useSelector(state => state.profileCurrent)

    const location = useLocation()

    useEffect(() => {

        let todoIconJS = document.querySelector('#iconMenuTodo')
        let imgTodoIconJS = document.querySelector('#iconMenuTodoIcon')
        todoIconJS.onmouseover = () => {
            imgTodoIconJS.className = 'iconsMenu iconsMenuSelected';
          }
          todoIconJS.onmouseleave = () => {
            if (window.location.pathname === '/app/todos') {
                imgTodoIconJS.className = 'iconsMenu iconsMenuSelected';
            } else {
                imgTodoIconJS.className = 'iconsMenu';
                }
            }

        let dailyIconJS = document.querySelector('#iconMenuDaily')
        let imgDailyIconJS = document.querySelector('#iconMenuDailyIcon')
        dailyIconJS.onmouseover = () => {
            imgDailyIconJS.className = 'iconsMenu iconsMenuSelected';
            }
        dailyIconJS.onmouseleave = () => {
            if (window.location.pathname === '/app/daily') {
                imgDailyIconJS.className = 'iconsMenu iconsMenuSelected';
            } else {
                imgDailyIconJS.className = 'iconsMenu';
                }
            }

        let noteIconJS = document.querySelector('#iconMenuNote')
        let imgNoteIconJS = document.querySelector('#iconMenuNoteIcon')
        noteIconJS.onmouseover = () => {
            imgNoteIconJS.className = 'iconsMenu iconsMenuSelected';
            }
        noteIconJS.onmouseleave = () => {
        if (window.location.pathname === '/app/notes') {
            imgNoteIconJS.className = 'iconsMenu iconsMenuSelected';
        } else {
            imgNoteIconJS.className = 'iconsMenu';
            }
        }

        let discIconJS = document.querySelector('#iconMenuDisc')
        let imgDiscIconJS = document.querySelector('#iconMenuDiscIcon')
        discIconJS.onmouseover = () => {
            imgDiscIconJS.className = 'iconsMenu iconsMenuSelected';
            }
            discIconJS.onmouseleave = () => {
        if (window.location.pathname === '/app/items') {
            imgDiscIconJS.className = 'iconsMenu iconsMenuSelected';
        } else {
            imgDiscIconJS.className = 'iconsMenu';
            }
        }

        let projIconJS = document.querySelector('#iconMenuProj')
        let imgProjIconJS = document.querySelector('#iconMenuProjIcon')
        projIconJS.onmouseover = () => {
            imgProjIconJS.className = 'iconsMenu iconsMenuSelected';
            }
        projIconJS.onmouseleave = () => {
        if (window.location.pathname === '/app/projects') {
            imgProjIconJS.className = 'iconsMenu iconsMenuSelected';
        } else {
            imgProjIconJS.className = 'iconsMenu';
            }
        }

        let accountIconJS = document.querySelector('#iconMenuAccount')
        let imgAccountIconJS = document.querySelector('#iconMenuAccountIcon')
        accountIconJS.onmouseover = () => {
            imgAccountIconJS.className = 'iconsMenu iconsMenuSelected';
            }
        accountIconJS.onmouseleave = () => {
        if (window.location.pathname === '/app/profile') {
            imgAccountIconJS.className = 'iconsMenu iconsMenuSelected';
        } else {
            imgAccountIconJS.className = 'iconsMenu';
            }
        }

      }, [])

      const handleClickMenu = () => {
        dispatch(changeMenuView(menuView.left, menuView.right))
      }
      
    return (
            <div className='nav' id='navExpandLeft'>
 
               <Logo user={user}/>
        
                <div className="navLinksMenu">
                    {location.pathname === '/app/todos' ? <Link className='navLink' to="/app/todos"><div className="menuNav menuNavSelected" id='iconMenuTodo'><img id='iconMenuTodoIcon' className='iconsMenu iconsMenuSelected' src={todoIcon} title='To Do' alt='To Do' />To Do</div></Link> : <Link className='navLink' to="/app/todos"><div className="menuNav" id='iconMenuTodo' ><img id='iconMenuTodoIcon' className='iconsMenu' src={todoIcon} title='To Do' alt='To Do' />To Do</div></Link>}
                    {location.pathname === '/app/daily' ? <Link className='navLink' to="/app/daily"><div className="menuNav menuNavSelected" id='iconMenuDaily'><img id='iconMenuDailyIcon' className='iconsMenu iconsMenuSelected' src={dailyIcon} title='Daily scrum' alt='Daily scrum' />Daily Scrum</div></Link> : <Link className='navLink' to="/app/daily"><div className="menuNav" id='iconMenuDaily'><img id='iconMenuDailyIcon' className='iconsMenu' src={dailyIcon} title='Daily scrum' alt='Daily scrum' />Daily Scrum</div></Link>}
                    {location.pathname === '/app/notes' ? <Link className='navLink' to="/app/notes"><div className="menuNav menuNavSelected" id='iconMenuNote'><img id='iconMenuNoteIcon' className='iconsMenu iconsMenuSelected' src={noteIcon} title='Note' alt='Note' />Notes</div></Link> : <Link className='navLink' to="/app/notes"><div className="menuNav" id='iconMenuNote' ><img id='iconMenuNoteIcon' className='iconsMenu' src={noteIcon} title='Note' alt='Note' />Notes</div></Link>}
                    {location.pathname === '/app/items' ? <Link className='navLink' to="/app/items"><div className="menuNav menuNavSelected" id='iconMenuDisc'><img id='iconMenuDiscIcon' className='iconsMenu iconsMenuSelected' src={discitemIcon} title='Meeting item' alt='Meeting item' />Meeting Items</div></Link> : <Link className='navLink' to="/app/items"><div className="menuNav" id='iconMenuDisc'><img id='iconMenuDiscIcon' className='iconsMenu' src={discitemIcon} title='Meeting item' alt='Meeting item' />Meeting Items</div></Link>}
                    {location.pathname === '/app/status' ? <Link className='navLink' to="/app/status"><div className="menuNav menuNavSelected" id='iconMenuProj'><img id='iconMenuProjIcon' className='iconsMenu iconsMenuSelected' src={fileIcon} title='Global status' alt='Global status' />Global Status</div></Link> : <Link className='navLink' to="/app/status"><div className="menuNav" id='iconMenuProj'><img id='iconMenuProjIcon' className='iconsMenu' src={fileIcon} title='Global status' alt='Global status' />Global Status</div></Link>}
                </div>

                <div>
                    {location.pathname === '/app/profile' ? <Link className='navLinkSelected' to="/app/profile"><div className="menuNav menuNavSelected" id='iconMenuAccount'><img id='iconMenuAccountIcon' className='iconsMenu iconsMenuSelected' src={accountIcon} title='Account' alt='Account' />{profile === null ? "Connect": profile.title}</div></Link> : <Link className='navLink' to="/app/profile"><div className="menuNav" id='iconMenuAccount'><img id='iconMenuAccountIcon' className='iconsMenu' src={accountIcon} title='Account' alt='Account' />{profile === null ? "Connect": profile.title}</div></Link>}   
                </div> 

                <div className="" onClick={handleClickMenu}>
                    <img id='' className='iconsMenu expandCollapse' src={collapseIcon} title='Collapse menu' alt='Collapse menu' />
                </div> 
            </div>
    )
}

export default MenuNavExpand