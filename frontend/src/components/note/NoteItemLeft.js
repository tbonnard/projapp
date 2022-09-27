import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'moment'


import { selectNote } from '../../reducers/selectNoteReducer'

import meetingIcon from '../../files/meetingIcon.svg'
import { selectNoteIndicator } from '../../reducers/selectNoteIndicatorReducer'

const NoteItemLeft = ({ item }) => {
    const dispatch = useDispatch()

    const selectedNote = useSelector(state => state.selectedNote)
    const projects = useSelector(state => state.projects)

    const [projName, setProjName] = useState('')
    const [color, setColor] = useState('')

    // const cutDescription = item.description.replace(/<[^>]*>?/gm, '').slice(0,20)
    const cutDescription = item.description.split('</p>')[0].replace(/<[^>]*>?/gm, '')


    useEffect(() => {
        projects.forEach( i => {
            if (i.id === item.project) {
                setProjName(i.projectName)
                setColor(i.color)
            }
        }) 
      }, [item, projects])


    const handleSelectNote = () => {
        dispatch(selectNote(item))
        dispatch(selectNoteIndicator())
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

if (!selectedNote) {
    return (
        <div className='itemNoteLeft' onClick={handleSelectNote}>
        {item.meetingNote && <img className='meetingIcon' src={meetingIcon} alt='Meeting Note' title={`Meeting Note ${Moment(item.meetingDate).format('dddd, MMMM Do YYYY')}`}/>}
        <p>{cutDescription}</p>
        <p className='itemDate'>Modified {Moment(item.date_modified).format('dddd, MMMM Do YYYY, h:mm a')}</p>
        <p className='itemDate'>Created {Moment(item.date_created).format('dddd, MMMM Do YYYY, h:mm a')}</p>
        <div style={{backgroundColor: color}} className='projectNameItemNote'>
                {projName}
            </div>
        </div>
    )
}
    return (
        <>
        {selectedNote.id === item.id ? 
                <div className='itemNoteLeft itemNoteLeftSelected' onClick={handleSelectNote}>
                {item.meetingNote && <img className='meetingIcon' src={meetingIcon} alt='Meeting Note' title={`Meeting Note ${Moment(item.meetingDate).format('dddd, MMMM Do YYYY')}`}/>}
                <p>{cutDescription}</p>
                <p className='itemDate'>Modified {Moment(item.date_modified).format('dddd, MMMM Do YYYY, h:mm a')}</p>
                <p className='itemDate'>Created {Moment(item.date_created).format('dddd, MMMM Do YYYY, h:mm a')}</p>
                <div style={{backgroundColor: color}} className='projectNameItemNote'>
                {projName}
            </div>
            </div>
            :
            <div className='itemNoteLeft' onClick={handleSelectNote}>
            {item.meetingNote && <img className='meetingIcon' src={meetingIcon} alt='Meeting Note' title={`Meeting Note ${Moment(item.meetingDate).format('dddd, MMMM Do YYYY')}`}/>}
            <p>{cutDescription}</p>
            <p className='itemDate'>Modified {Moment(item.date_modified).format('dddd, MMMM Do YYYY, h:mm a')}</p>
            <p className='itemDate'>Created {Moment(item.date_created).format('dddd, MMMM Do YYYY, h:mm a')}</p>
            <div style={{backgroundColor: color}} className='projectNameItemNote'>
                {projName}
            </div>
        </div>
        }
        </>

    )

    
}

export default NoteItemLeft