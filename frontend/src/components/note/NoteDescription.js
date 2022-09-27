import React from 'react'

import { useSelector } from 'react-redux'

import NoteItemRight from './NoteItemRight'


const NoteDescription = ({items, projects}) => {

    const selectedNote = useSelector(state => state.selectedNote)

    if (!selectedNote | !projects) {
        return null
    }
    
    return (
        <div className='noteRight'>
            <NoteItemRight projects={projects} note={items.filter(item => item.id === selectedNote.id)} selectedNote={selectedNote}/>
        </div>
    )
}

export default NoteDescription