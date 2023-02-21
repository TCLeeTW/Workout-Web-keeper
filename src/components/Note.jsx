import React from "react";

function Note(props) {
  function handleDelete() {
    props.onDelete(props.id);
  }

  function handleEdit() {
    props.onEdit(props.id);
  }

  return (
    <div className="note">
      <button onClick={handleEdit}>Edit</button>

      <h1>{props.title}</h1>
      <p>{props.content}</p>

      <button onClick={handleDelete}>DELETE</button>
    </div>
  );
}

export default Note;
