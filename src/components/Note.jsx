import React, { useState } from "react";
import { formatDate } from "../utils/dateUtils";
function Note(props) {

  function handleAction() {
    if (actionButton === "Delete") {
      props.onDelete(props.id);
    } else {
      props.onUpdate(props.id)
      setActionButton("Delete")
    }
  }

  //Know which note is editing -->Checked
  //Load the content into a state-->Checked
  //Turn it into editable box-->Checked
  //Use same method of onchange to manage the content
  ////Here is a bit of problem, I will need to find a way to pass the edited value back to the state. 
  //Use the same method of save to save it back to the database. 
  const [editable, setEditable] = useState("false")
  const [actionButton, setActionButton] = useState("Delete")
  const [updateNote, setUpdateNote] = useState({
    id: "",
    title: "",
    content: ""
  });

  function initEdit() {
    setUpdateNote({ id: props.id, title: props.title, content: props.content });
    console.log(updateNote)
    setEditable("true")
    setActionButton("Save")
  }

  function handleChange(event) {
    const { localName, textContent } = event.target;
    function name(input) {
      if (input === "p") {
        return "content"
      } else {
        return "title"
      }
    };
    console.log(name(localName));
    console.log(textContent);

    setUpdateNote(prevNote => {
      return {
        ...prevNote,
        [name(localName)]: textContent
      };
    });
    console.log(updateNote);


  }
  function handleBlur(event) {
    props.onBlur(updateNote)
    setEditable( "false");

  }


  return (
    <div className="note" >

      <h1
        name="title"
        onClick={initEdit}
        onInput={handleChange}
        onBlur={handleBlur}
        value={updateNote.content}
        contentEditable={editable}>{props.title}</h1>

      <p
        name="content"
        onClick={initEdit}
        onInput={handleChange}
        onBlur={handleBlur}
        value={updateNote.content}
        contentEditable={editable}>{props.content}</p>
      <p className="time-mark">Last edited on {formatDate(props.time)}</p>

      <button onClick={handleAction}>{actionButton}</button>
    </div>
  );
}

export default Note;
