import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { userLoginDemo } from '../../reducers/userReducer'


import todoIcon from '../../files/todo.svg';
import dailyIcon from '../../files/daily.svg';
import noteIcon from '../../files/note.svg';
import discitemIcon from '../../files/discitem.svg';
import fileIcon from '../../files/file.svg';
import accountIcon from '../../files/account.svg';

const HomePage = () => {
    const history = useHistory();
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    const handleClick = () => { 
        let path = `app/todos`; 
        if (user) {
            history.push(path);
        } else {
            path = `signin`; 
            history.push(path);
        }
    }

    const handleDemo = (e) => {
        e.preventDefault()
        dispatch(userLoginDemo())
        setTimeout(() => {
            let path = `app/todos`; 
            history.push(path); 
        }, 500);
    }

    return (
        <div className='containerGlobalHome'>
            <div className="section1">
                <div className="SubSection1">
                <h1>ProjApp</h1>
                <p>Just your personal everyday work tool</p>
                <p>it is not a collaborative tool, but a simple personal work space</p>
                <div className="buttonSubSection1">
                    <button onClick={handleClick}>start</button>
                    <button className='demoLogin' onClick={handleDemo}>connect as demo</button>
                </div>
                {/* <button onClick={handleDemo}>connect as demo</button> */}
                </div>
            </div>
            <div className="section">
                <div className="sectionItem">
                    <img className='iconsHome' src={todoIcon} title='To Do' alt='To Do' />
                    <p>To Do</p>
                    <p className="descItemHome">keep track of your tasks</p>
                </div>
                <div className="sectionItem">
                    <img className='iconsHome' src={noteIcon} title='Notes' alt='Notes' />
                    <p>Notes</p>
                    <p className="descItemHome">gather and format important information you want to keep</p>
                </div>
                <div className="sectionItem">
                    <img className='iconsHome' src={dailyIcon} title='Daily Scrum' alt='Daily Scrum' />
                    <p>Daily Scrum</p>
                    <p className="descItemHome">be ready and up to date for your daily meetings</p>
                </div>
                <div className="sectionItem">
                    <img className='iconsHome' src={discitemIcon} title='Meeting details' alt='Meeting details' />
                    <p>Meeting details</p>
                    <p className="descItemHome">don't forget items to discuss during your next meetings</p>
                </div>
                <div className="sectionItem">
                    <img className='iconsHome' src={fileIcon} title='Project status' alt='Project status' />
                    <p>Project status</p>
                    <p className="descItemHome">have a high level view of your projects</p>
                </div>
                <div className="sectionItem">
                    <img className='iconsHome' src={accountIcon} title='Multi profiles' alt='Multi profiles' />
                    <p>Multi profiles</p>
                    <p className="descItemHome">create several profiles to ease your clients' and projects'management</p>
                </div>
            </div>


            {/* <div className="section">
                <h3>To Do</h3>
                <div className="subSection">
                    <div>Info</div>
                    <div>image</div>
                </div>
            </div>
            <div className="section">
                <h3>Daily Scrum</h3>
                <div className="subSection">
                    <div>Info</div>
                    <div>image</div>
                </div>
            </div>
            <div className="section">
                <h3>Notes</h3>
                <div className="subSection">
                    <div>Info</div>
                    <div>image</div>
                </div>
            </div>
            <div className="section">
                <h3>Meeting details</h3>
                <div className="subSection">
                    <div>Info</div>
                    <div>image</div>
                </div>
            </div>
            <div className="section">
                <h3>Global status of your projects</h3>
                <div className="subSection">
                    <div>Info</div>
                    <div>image</div>
                </div>
            </div>
            <div className="section">
                <h3>Mutliple profiles</h3>
                <div className="subSection">
                    <div>Info</div>
                    <div>image</div>
                </div>
            </div> */}

        </div>
    )
}

export default HomePage