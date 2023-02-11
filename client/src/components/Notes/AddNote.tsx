import React, { useContext, useState } from 'react'
import { DataContext } from '../../context/DataContext';
import { AllContext } from '../../context/types';
import { AuthButton } from '../Buttons/Buttons';
import { FormInput } from '../inputs/Inputs'

const AddNote = () => {
    const {handleAddNote} = useContext(DataContext) as AllContext;
    const [noteData, setNoteData] = useState({
        title: "",
        text:"",
        links:[],
    })
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const {name, value} =  e.target;
        setNoteData(prev=>{
            return {...prev, [name]:value}
        });
    }
  return (
    <div>
        <FormInput placeholder='Title' onChange={handleChange} name="title" value={noteData.title} type="text" />
        <FormInput placeholder='Text' onChange={handleChange} name="text" value={noteData.text} type="textarea" />
        <AuthButton text='Add note' onClick={()=>handleAddNote(noteData)}/>
    </div>
  )
}

export default AddNote