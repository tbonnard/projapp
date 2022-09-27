import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'

import Moment from 'moment'
// https://medium.datadriveninvestor.com/https-medium-com-sabesan96-why-you-should-choose-day-js-instead-of-moment-js-9cf7bb274bbd

import { updateNoteProject, updateNoteMeetingNote, updateNoteMeetingDate } from '../../reducers/NotesReducer'

 import TipTapGlobal from '../tiptap/TipTapGlobal'
import QuillEditor from '../tiptap/QuillEditor'


const NoteItemRight = ({ note, projects, selectedNote }) => {
    const dispatch = useDispatch()

    const [checkedMeeting, setCheckedMeeting] = useState(selectedNote.meetingNote)
    const [noteDate, setNoteDate] = useState('')
    const [color, setColor] = useState('')
    const [projectItem, setProjectItem] = useState('')

    useEffect(() => {
        setCheckedMeeting(selectedNote.meetingNote)
        setProjectItem(selectedNote.project)
        projects.forEach( i => {
            if (i.id === selectedNote.project) {
                setColor(i.color)
            }
        }) 
        if (selectedNote.meetingDate) {
            setNoteDate(selectedNote.meetingDate)
        } else {
            setNoteDate('')
        }
      }, [dispatch,projects, selectedNote])

    const handleChange = (e) => {
        //console.log(e.target)
        const itemObject = {id:note[0].id, projectId:e.target.value}
        dispatch(updateNoteProject(itemObject))
        setProjectItem(e.target.value)
        projects.forEach( i => {
            if (i.id === e.target.value) {
                setColor(i.color)
            }
        }) 
    }

    const handleChangeMeetingNote = (e) => {
        // console.log(e.target.checked)
        setCheckedMeeting(e.target.checked)
        const itemObject = {id:selectedNote.id, meetingNote:e.target.checked}
        dispatch(updateNoteMeetingNote(itemObject))
    }

    const handleChangeMeetingDate = (e) => {
        // console.log(e.target.value)
        setNoteDate(e.target.value)
        const itemObject = {id:note[0].id, meetingDate:e.target.value}
        dispatch(updateNoteMeetingDate(itemObject))
    }


    if (projects.length === 0 | note.length ===0 ) {
        return null
    }


    return (
        <>
            <div className='noteTopRightSection'>
                <div className='noteTopRightSectionRight'>
                    <div className='noteTopRightSectionRightSelect'>
                        <div className='insideRight'>
                            <label htmlFor="checkid" className="checkboxInlineLabel">
                                <input id="checkid" type="checkbox"  className='checkboxInlineCheckbox' checked={checkedMeeting} onChange={(e) => handleChangeMeetingNote(e)} />
                                Meeting note
                            </label>
                        </div>
                        {note[0].meetingNote && 
                        <div className='insideRight selectDate'>
                            <label>
                                <input type="date" className='dateInput' value={Moment(noteDate).format('YYYY-MM-DD')} onChange={(e) => handleChangeMeetingDate(e)}/>
                            </label>
                        </div>
                        }
                        <div className='selectProj' style={{backgroundColor: color}}>
                        <select name="projects" value={projectItem} onChange={(e) => handleChange(e)}>
                        {projects.map(proj => <option key={proj.id} value={proj.id}>{proj.projectName}</option> )}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className='noteDesc'>
                {/* <TipTapGlobal selectedNote={selectedNote}/> */}
                <QuillEditor selectedNote={selectedNote} />
            </div>
        </>
    )
}

export default NoteItemRight