import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateNote} from '../../reducers/NotesReducer'
import { noteSavingReducer, noteSavedReducer } from '../../reducers/selectNoteSavedReducer'


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function QuillEditor({selectedNote}) {
    const dispatch = useDispatch()
  
    const selectNoteIndicator = useSelector(state => state.selectNoteIndicator)
    const [userInfo, setuserInfo] = useState(selectedNote.description);
    // const [noteId, setNoteId] = useState(selectedNote.id);

    const handleUpdateDescription = (value, delta,source, editor) => {
      if (source === 'user') {
        // console.log(delta)
        // console.log(source)
        setuserInfo(value);
        const itemObject = {id:selectedNote.id, title:selectedNote.title, description:value}
        setTimeout(() => {
          dispatch(updateNote(itemObject))
        }, 500);
      }
    } 
    
    const handleFocus = () =>{
      // setNoteId(selectedNote.id)
      dispatch(noteSavingReducer())
    }

    const handleBlur = () => {
      dispatch(noteSavedReducer())
    }



    const modules = {
      toolbar: [
        ["bold", "underline", "italic","strike"],
        ["code-block", "blockquote"],
        [{ 'indent': '-1'}, { 'indent': '+1' }], 
        [{ 'size': ['small', false, 'large', 'huge'] }], 
        [{ header: [1, 2, 3, 4, 5] }],
        [{ list: "ordered" }],
        [{ list: "bullet" }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['link'], ['image'], ['video'],
        ['clean'],
      ]
    }

    useEffect(() => {
      setuserInfo(selectedNote.description)
    },[selectNoteIndicator])


    return(
      <div className='editor'>
        <ReactQuill modules={modules} 
                      theme="snow" 
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      onChange={handleUpdateDescription} 
                      value={userInfo}
                      placeholder={"Note details"}
                      />
      </div>
    );
}
export default QuillEditor;
