import React, { useContext } from 'react'
import { AllContext, INote } from '../../context/types'
import style from "./notes.module.css"
import {AiOutlinePlus} from "react-icons/ai"
import { DataContext } from '../../context/DataContext'
import AddNote from './AddNote'
import SingleNote from './SingleNote'
import config from '../../config'

const Notes = ({notes, oneNote}:{notes:  INote[] | null; oneNote:boolean}) => {
  const {showDashForm, setShowDashForm}= useContext(DataContext) as AllContext;
  const handleShare = (_id:string)=>{
    alert(`This is your link: ${config.VITE_URL}/note/${_id}`)
  }
  return (
    <>
      {showDashForm==="addnote" && <AddNote />}
      <div className={oneNote===true ? style["outer-one-note-container"]: style["notes-container"]} >
      {!oneNote && <div className={style["new-note"]}  onClick={()=>setShowDashForm("addnote")} >
        <AiOutlinePlus size={50} /> New Note
      </div>}
        
        {notes && notes.map((item, index)=>(
          <SingleNote item={item} key={item._id} handleShare={handleShare} oneNote={oneNote} />
        )
        )}
      </div>
    </>
  )
}

export default Notes