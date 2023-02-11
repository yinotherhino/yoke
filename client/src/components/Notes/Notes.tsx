import React, { useContext } from 'react'
import { AllContext, INote } from '../../context/types'
import style from "./notes.module.css"
import {AiOutlinePlus} from "react-icons/ai"
import { DataContext } from '../../context/DataContext'
import AddNote from './AddNote'

const Notes = ({notes}:{notes:  INote[]}) => {
  const {showDashForm, setShowDashForm}= useContext(DataContext) as AllContext
  return (
    <>
      {showDashForm==="addnote" && <AddNote />}
      <div className={style["notes-container"]} >
      <div className={style["new-note"]}  onClick={()=>setShowDashForm("addnote")} >
        <AiOutlinePlus size={50} /> New Note
      </div>
        
        {notes.map((item, index)=>(<div key={index} className={style["box"] }>
            {item.text}
          </div>)
        )}
      </div>
    </>
  )
}

export default Notes