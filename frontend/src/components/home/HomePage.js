import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'


const HomePage = () => {
    const history = useHistory();

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

    return (
        <div className='containerGlobalHome'>
            <div className="section1">
                <div className="SubSection1">
                <h1>AppName</h1>
                <p>Just your personal everyday work tool</p>
                <p>it is not a collaborative tool, but just a space for your details</p>
                <div className="buttonSubSection1">
                <button onClick={handleClick}>start</button>
                </div>
                </div>
            </div>
            <div className="section">
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
            </div>
        </div>
    )
}

export default HomePage