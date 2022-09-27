import React, {useState } from 'react'
import { useDispatch  } from 'react-redux'

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { updateNote} from '../../reducers/NotesReducer'


const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is_active" : ""}
        >
          {/* <FaBold /> */}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is_active" : ""}
        >
          {/* <FaItalic /> */}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is_active" : ""}
        >
          {/* <FaUnderline /> */}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is_active" : ""}
        >
          {/* <FaStrikethrough /> */}
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is_active" : ""
          }
        >
          {/* <FaHeading /> */}
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is_active" : ""
          }
        >
          {/* <FaHeading className="heading3" /> */}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is_active" : ""}
        >
          {/* <FaListUl /> */}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is_active" : ""}
        >
          {/* <FaListOl /> */}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is_active" : ""}
        >
          {/* <FaQuoteLeft /> */}
        </button>
      </div>
      <div>
        <button onClick={() => editor.chain().focus().undo().run()}>
          {/* <FaUndo /> */}
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          {/* <FaRedo /> */}
        </button>
      </div>
    </div>
  );
};

const TipTapGlobalMenu = ({ selectedNote }) => {

  const dispatch = useDispatch()
  
  const [description, setDescription] = useState(selectedNote.description)
  console.log(selectedNote)
  console.log(description)

  const editor = useEditor({
    extensions: [StarterKit],
    content: selectedNote.description,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setDescription(html)
      const itemObject = {id:selectedNote.id, title:selectedNote.title, description:html}
      setTimeout(() => {
      dispatch(updateNote(itemObject))
        }, 500);
    },
  },[dispatch]);

  return (
    <div className="textEditor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapGlobalMenu