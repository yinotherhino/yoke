import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { AllContext, INote, INoteData } from "../../context/types";
import Login from "../Login/Login";
import Signup from "../Login/Signup";
import Navbar from "../Navbar/Navbar";
import Notes from "../Notes/Notes";

const Note = () => {
  const { showForm, getNodeById, isLoggedIn } = useContext(DataContext) as AllContext;
  const [note, setNote] = useState<null | INote[]>(null);

  const { id } = useParams();
  const getNote = async () => {
    const note = await getNodeById(id!);
    if (!note) {
      return;
    }
    setNote([note]);
  };
  useEffect(() => {
    void getNote();
    console.log(note)
  }, [id]);
  return (
    <>
      <Navbar />
      {note && <Notes notes={note} oneNote={true} />}
      {!isLoggedIn && showForm === "login" ? <Login /> : <Signup />}
    </>
  );
};

export default Note;
