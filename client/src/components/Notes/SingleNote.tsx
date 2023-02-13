import React, { useContext, useEffect, useState } from "react";
import { AllContext, INote } from "../../context/types";
import style from "./notes.module.css";
import { BsShare } from "react-icons/bs";
import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";
import { DataContext } from "../../context/DataContext";

const SingleNote = ({
  item,
  handleShare,
  oneNote,
  editNote,
}: {
  item: INote;
  handleShare: (_id: string) => void;
  oneNote: boolean;
  editNote?: (id: string) => void;
}) => {
  const [text, setText] = useState("");
  useEffect(() => {
    getText();
  }, [item, text]);

  const { handleDeleteNote, showDashForm, setShowDashForm } = useContext(
    DataContext
  ) as AllContext;
  const linkStarts = item.links.map(link => {
    return link.start;
  });
  const linkEnds = item.links.map(link => {
    return link.end;
  });

  const linkUrls = item.links.map(link => {
    return link.url;
  });

  const getText = () => {
    const texts = item.text.split("");
    let res = "";
    texts.map((letter, index) => {
      if (linkStarts.includes(index)) {
        const url = linkUrls[linkStarts.indexOf(index)];
        res += `<a href="${url}" style="text-decoration: underline; color:#537FE7">${letter}`;
      } else if (linkEnds.includes(index + 1)) {
        res += `${letter}</a>`;
      } else {
        res += letter;
      }
    });
    setText(res);
  };

  const handleDelete = (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    const result = confirm(
      "Are you sure you want to delete this note? This action is irreversible."
    );
    if (result === true) {
      handleDeleteNote(item._id!);
    }
    return;
  };

  const handleEdit = (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    if(!editNote){
      return
    }
    editNote(item._id!)
    setShowDashForm("editnote");
  };

  return (
    <div
      className={oneNote === true ? style["one-note-container"] : style["box"]}
    >
      <div onClick={() => handleShare(item._id!)}>
        <BsShare size={15} className="pointer" />{" "}
        <span className={style["share"] + " pointer"}>Share</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: text }} />
      {oneNote === false && (
        <AiOutlineDelete size={20} className="pointer" onClick={handleDelete} />
      )}
      {oneNote === false && (
        <AiFillEdit size={20} className="pointer" onClick={handleEdit} />
      )}
    </div>
  );
};

export default SingleNote;
