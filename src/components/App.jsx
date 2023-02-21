import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc,  doc, query, orderBy } from "firebase/firestore"


function App() {

  //Setup "notes" State
  const [notes, setNotes] = useState([]);

  //Load data from database
  const notesCollectionRef = collection(db, "notes")
  const getData = async () => {
    const data = await getDocs(query(notesCollectionRef, orderBy('time',"desc")))
    // const data = await notesCollectionRef.orderBy("time").get()
    const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    const notes = data.docs.map(doc => ({ ...doc.data() }))
    console.log(data)
    console.log(arrayData)
    console.log(notes);
    setNotes(arrayData)
  }

  useEffect(() => {
    getData()
  }, [])

  //Adding new note
  const addNoteToDatabase = async (newNote) => {
    const saveTime=new Date()
    console.log(saveTime);
    await addDoc(notesCollectionRef, { title: newNote.title, content: newNote.content,time:saveTime});
    getData()
  }
  function addNote(newNote) {
    addNoteToDatabase(newNote)
    // setNotes(prevNotes => {
    //   return [...prevNotes, newNote];
    // });
  }

  // //editing Note
  function editNote(id) {

  }

  //Delete existing note

  const deleteNoteFromDatabase = async (id) => {
    const toDelete = doc(db, "notes", id)
    await deleteDoc(toDelete)
  }
  function deleteNote(deleteId) {
    deleteNoteFromDatabase(deleteId)

    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return noteItem.id !== deleteId;
      });
    });
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
            editOn={Date( noteItem.time)}
            onDelete={deleteNote}
            onEdit={editNote}
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