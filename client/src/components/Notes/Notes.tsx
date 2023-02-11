import React from 'react'
import { INote } from '../../context/types'
import style from "./notes.module.css"
import {AiOutlinePlus} from "react-icons/ai"

const Notes = ({notes}:{notes:  INote[]}) => {
  return (
    <>
      <div className={style["notes-container"]} >
      <div className={style["new-note"]}>
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