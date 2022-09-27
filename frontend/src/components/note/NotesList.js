import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import NoteItemLeft from './NoteItemLeft'
import { selectNote } from '../../reducers/selectNoteReducer'
import { unGetNote } from '../../reducers/getNoteReducer'

import loadingGif from '../../files/loading.gif';


const NotesList = ({items}) => {

    const dispatch = useDispatch()
    const noteSaved = useSelector(state => state.noteSaved)

    const getNoteFromId = useSelector(state => state.getNote)

    useEffect(() => {
        if (!getNoteFromId) {
            dispatch(selectNote(items[0]))
        }
        dispatch(unGetNote())       
      }, [dispatch, getNoteFromId, items])

    if (items.length===0) {
        return (
            <div>
                <p className='infoText'>no note yet</p>
            </div>
        )
    }

    if (noteSaved) {
        return <div className='notesLeftTitle'><img className='gifLoading' src={loadingGif} title='saving the note' alt='saving the note' /></div>
    }
    
    
    return (
        <div className='notesLeftTitle'>
            {items.map(note => <NoteItemLeft key={note.id} item={note}/>)}
        </div>
    )
}

export default NotesList