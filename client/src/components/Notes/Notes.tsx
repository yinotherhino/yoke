import React, { useContext, useEffect, useState } from 'react'
import { AllContext, INote, INoteData } from '../../context/types'
import style from "./notes.module.css"
import {AiOutlinePlus} from "react-icons/ai"
import { DataContext } from '../../context/DataContext'
import AddNote from './AddNote'
import SingleNote from './SingleNote'
import config from '../../config'

const Notes = ({notes, oneNote}:{notes:  INote[] | null; oneNote:boolean}) => {
  const {showDashForm, setShowDashForm, handleAddNote, handleEditNote}= useContext(DataContext) as AllContext;
  const [toBeEdited, setToBeEdited] = useState<INote | undefined>()
  const handleShare = (_id:string)=>{
    alert(`This is your link: ${config.VITE_URL}/note/${_id}`)
  }
  const editNote = (id:string)=>{
    setShowDashForm("editnote");
    if(!notes){
      return;
    }
    const index = notes?.findIndex(item=>item._id === id)
    setToBeEdited(notes[index])
  }
  return (
    <>
      {showDashForm==="addnote" && <AddNote handleAddNote={handleAddNote} />}
      {showDashForm==="editnote" && <AddNote initialNoteData={toBeEdited} handleEditNote={handleEditNote} />}
      
      <div className={oneNote===true ? style["outer-one-note-container"]: style["notes-container"]} >
      {!oneNote && (<div className={style["new-note"]}  onClick={()=>setShowDashForm("addnote")} >
        <AiOutlinePlus size={50} /> New Note
      </div>)}
        
        {notes && notes.map((item, index)=>(
          <SingleNote item={item} key={item._id} handleShare={handleShare} oneNote={oneNote} editNote={editNote}/>
        )
        )}
      </div>
    </>
  )
}

export default Notes