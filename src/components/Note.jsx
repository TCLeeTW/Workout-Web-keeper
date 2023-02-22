import React, { useState } from "react";

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
    //##Error message shows should use event.persist instead of event.currentTarget
    // console.log(event.currentTarget.textContent)
    const { name, textContent } = event.target;
    console.log(name);
    console.log(event.target.name);
    console.log(textContent);

    // setUpdateNote(prevNote => {
    //   return {
    //     ...prevNote,
    //     [name]: textContent
    //   };
    // });
    // console.log(updateNote);
  }


  return (
    <div className="note" >

      <h1 name="title" onClick={initEdit} onInput={handleChange} value={updateNote.content} contentEditable={editable}>{props.title}</h1>
      <p name="content" onClick={initEdit} onInput={handleChange} value={updateNote.content} contentEditable={editable}>{props.content}</p>
      <p className="time-mark">Last edited on {props.editOn}</p>

      <button onClick={handleAction}>{actionButton}</button>
    </div>
  );
}

export default Note;
