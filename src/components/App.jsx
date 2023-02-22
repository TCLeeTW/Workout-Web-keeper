import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, orderBy } from "firebase/firestore"


function App() {

  //Setup "notes" State
  const [notes, setNotes] = useState([]);

  //Load data from database
  const notesCollectionRef = collection(db, "notes")
  const getData = async () => {
    //In order to make the latest note shows the first, need to sort with time and descent. 
    const data = await getDocs(query(notesCollectionRef, orderBy('time', "desc")))
    //Map thru the docs get from database and put it into an array
    const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data(), editable: "false" }))
    //Set the array to local var. 
    setNotes(arrayData)
  }

  useEffect(() => {
    getData()
  }, [])

  //Adding new note
  const addNote = async (newNote) => {
    const saveTime = new Date()
    console.log(saveTime);
    await addDoc(notesCollectionRef, { title: newNote.title, content: newNote.content, time: saveTime });
    getData()
  }


  // //editing Note
  const updateNote = async (updateNote) => {
    //passing updateNote from the note.jsx
    //updateTarget is set for firebase function "updateDoc" to recognize which document to update. 
    //It takes 3 parameter: the database, the collection and the document ID. 
    const updateTarget = doc(db, "notes", updateNote.id)
    const saveTime = new Date()
    await updateDoc(updateTarget, {
      title: updateNote.title,
      content: updateNote.content,
      time: saveTime
    })
    getData()

  }

  //Delete existing note

  const deleteNote = async (id) => {
    const toDelete = doc(db, "notes", id)
    await deleteDoc(toDelete)
    getData()
  }



  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            editOn={Date(noteItem.time).toLocaleString("zh-CN")}
            onDelete={deleteNote}
            onUpdate={updateNote}
            //the updateNote function will take place either user leave the editing, which is unBlur, or clikced save. 
            onBlur={updateNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;

// //note here
// //use Switch to go between different routes. 

// const App = () => {
//   return (
//     <div>
//       <Switch>
//         <Route path="/" exact component={Home} />
//         <Route path="/about" exact component={About} />
//         <Route path="/brands" exact component={Brands} />
//         <Route path="/guide" exact component={Guide} />
//         <Route path="/contact" exact component={Contact} />

//         <Route
//           render={function() {
//             return <p>Not found</p>;
//           }}
//         />
//       </Switch>
//     </div>
//   );
// };