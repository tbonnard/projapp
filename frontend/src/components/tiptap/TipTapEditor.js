// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import Placeholder from '@tiptap/extension-placeholder'

// import './stylesTipTap.css'

// import { updateNote} from '../../reducers/NotesReducer'
// import TipTapMenuBar from './TipTapMenuBar'


// const TipTapEditor = ({selectedNote}) => {
//   const dispatch = useDispatch()

//   // const selectedNote = useSelector(state => state.selectedNote)

//   // const [lastText, setLastText] = useState(element.description);
//   const [text, setText] = useState(selectedNote.description);
//   // const [saved, setTextSaved] = useState(false);
//   const [cursorNumber, setCursorNumber] = useState(0);

//   // https://tiptap.dev/api/editor#autofocus
//   //https://github.com/ueberdosis/tiptap/issues/367
//   // autofocus: 'end' | cursorNumber,
//   //editor.commands.setTextSelection(cursorNumber)


//   // useEffect(() => {
//   //   setText(selectedNote.description)
//   // }, [selectedNote])
  
//   const editor = useEditor({
//     autofocus: 'end' | cursorNumber,
//     parseOptions: {
//         preserveWhitespace: 'full'
//         },
//       extensions: [
//         StarterKit,
//         Placeholder.configure({
//           placeholder: 'note details',
//         }),
//       ],
//       content: text,
//       // onTransaction: ({ editor }) => {
//       // },
//       onUpdate({ editor }) {
//       //   setCursorNumber(editor.view.state.selection.anchor)
//         console.log(editor.getHTML())
//         console.log(editor.getJSON())
//         console.log(editor.getJSON().content[0].content[0].text)
//         setText(editor.getHTML())
//         const itemObject = {id:selectedNote.id, title:selectedNote.title, description:editor.getHTML()}
//         setTimeout(() => {
//         dispatch(updateNote(itemObject))
//           }, 500);
//         },
//   },[]);


//   const handleSave = () =>{
//       // const itemObject = {id:selectedNote.id, title:selectedNote.title, description:editor.getHTML()}
//       // setTimeout(() => {
//       // dispatch(updateNote(itemObject))
//       //   }, 500);
//   }

//   // https://www.bradcypert.com/autosaving-with-react-hooks/


//   // const AUTOSAVE_INTERVAL = 500;
//   // useEffect(() => {
//   //   const timer = setTimeout(() => {
//   //     // if (lastText !== text) {
//   //     //   //updateContent({ variables: { content: text, id: chapterId } });
//   //     //   // const itemObject = {id:element.id, title:element.title, description:editor.getHTML()}
//   //     //   // dispatch(updateNote(itemObject))
//   //     //   // setTextSaved(true)
//   //     //   // setLastText(text);
//   //     //   // setTimeout(() => {
//   //     //   //   setTextSaved(false)
//   //     //   // }, AUTOSAVE_INTERVAL);
//   //     // }
//   //   }, AUTOSAVE_INTERVAL)
//   //   return () => clearTimeout(timer);
//   // }, [text]);


//   return (
//       <div>
//         <TipTapMenuBar editor={editor}/>
//         <EditorContent editor={editor} />
//       </div>
//     )
//   }

//   export default TipTapEditor


import React, { useState, useEffect } from 'react'

import { useEditor, EditorContent } from '@tiptap/react'
import { Editor } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

import TipTapMenuBar from './TipTapMenuBar'



const TipTapEditor = ({selectedNote}) => {
  const CustomDocument = Document.extend({
    content: 'heading block*',
  })
  
  const [text, setText] = useState(selectedNote.description);
  

  // useEffect(() => {
  //     setText(selectedNote.description)
  // }, [selectedNote.id])

  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomDocument,
      Placeholder.configure({
          placeholder: 'note details',
        }),
    ],
    content: text,
    autofocus: true,
    editable: true,
    injectCSS: false,
    onTransaction({editor}) {
      // console.log('text' , selectedNote.description)
      // console.log(editor)
      setText(selectedNote.description)
    },
    onUpdate() {
      console.log('a')
    },
  },[selectedNote.id])




  return (
    <>
    <TipTapMenuBar  editor={editor}/>
    <EditorContent editor={editor} />
    </>
  )
}

export default TipTapEditor