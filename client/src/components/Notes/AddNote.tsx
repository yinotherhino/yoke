import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { AllContext, INote } from "../../context/types";
import { AuthButton } from "../Buttons/Buttons";
import { INoteData } from "../../context/types";
import { AiOutlineLink, AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import style from "./notes.module.css";

const AddNote = ({
  initialNoteData,
  handleAddNote,
}: {
  initialNoteData?: INoteData;
  handleAddNote: Function;
}) => {
  const { setShowDashForm } = useContext(DataContext) as AllContext;

  const [noteData, setNoteData] = useState<INoteData | INote>({
    text: "",
    links: [],
  });
  const [selected, setSelected] = useState("");
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const [linkUrl, setLinkUrl] = useState("");
  const [showAddLink, setShowAddLink] = useState(false);

  const handleTextareaChange = (e: any) => {
    setNoteData(prev => {
      return { ...prev, text: e.target.value };
    });
  };

  useEffect(() => {
    if (initialNoteData) {
      setNoteData(initialNoteData);
      console.log(initialNoteData)
    }
  }, []);

  const handleAddLink = (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    if (showAddLink === true) {
      setShowAddLink(false);
      return;
    }
    if (selectionStart === selectionEnd) {
      alert("You have not made any selection");
      return;
    }
    setShowAddLink(true);
  };

  const submitLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setNoteData(prev => {
      return {
        ...prev,
        links: [
          ...prev.links,
          { url: linkUrl, start: selectionStart, end: selectionEnd },
        ],
      };
    });
    setLinkUrl("");
    setSelectionStart(0);
    setSelectionEnd(0);
  };

  const handleSelect = (e: any) => {
    setSelectionStart(e.target.selectionStart);
    setSelectionEnd(e.target.selectionEnd);
    setSelected(
      noteData.text.slice(e.target.selectionStart, e.target.selectionEnd)
    );
    console.log(
      noteData.text.slice(e.target.selectionStart, e.target.selectionEnd)
    );
  };
  return (
    <div className={style["addnote-container"]}>
      <div>
        <AiOutlineLink
          size={20}
          className={style["link-btn"]}
          onClick={handleAddLink}
        />{" "}
        {showAddLink && (
          <>
            <p>selected: {selected}</p>
            <span>url</span>
            <input
              type="text"
              required
              value={linkUrl}
              name="linkText"
              onChange={e => setLinkUrl(e.target.value)}
            />
            <button className={style["submit-link"]} onClick={submitLink}>
              <AiOutlineCheck size={20} />
            </button>
          </>
        )}
        <AiOutlineClose
          className={style["close-btn"]}
          size={20}
          onClick={() => setShowDashForm(null)}
        />
        <textarea
          className={style["text"]}
          placeholder="note..."
          name="text"
          value={noteData.text}
          onChange={handleTextareaChange}
          onSelect={handleSelect}
          required
        />
        <AuthButton text="Add note" onClick={() => handleAddNote(noteData)} />
      </div>
    </div>
  );
};

export default AddNote;
