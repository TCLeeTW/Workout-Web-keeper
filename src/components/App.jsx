import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Start from "../pages/Start"
import Keeper from "../pages/Keeper"
import Login from "../pages/Login";
import Header from "./Header";
import Footer from "./Footer";

import Note from "./Note";
import CreateArea from "./CreateArea";
import { db, signInwithGoogle } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, orderBy, where,get } from "firebase/firestore"


function App() {
  const [currentUser, setCurrentUser] = useState();
  const loginWithGoogle = async () => {
    const result = await signInwithGoogle();
    const user = result.user.uid
    setCurrentUser(user);
  }

  useEffect(() => {
    console.log(currentUser);
    if(currentUser){
      getData()
    }else{
      console.log("Please login to use this app")
    }
  }, [currentUser]);



  //Setup "notes" State
  const [notes, setNotes] = useState([]);

  //CRUD of the notes
  ////READ
  //Load data from database
  const notesCollectionRef = collection(db, "notes");

  const getData = async () => {
    //In order to make the latest note shows the first, need to sort with time and descent. 
    const data = await getDocs(query(
      notesCollectionRef,
      where("user","==",currentUser),
      orderBy('time', "desc")))
    //Map thru the docs get from database and put it into an array
    const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data(), editable: "false" }))
    //Set the array to local var. 

    setNotes(arrayData)
  }

  useEffect(() => {
    if(currentUser){
      getData()
    }else{
      console.log("Please login to use this app")
    }
  }, [])

  ////ADD
  const addNote = async (newNote) => {
    const saveTime = new Date()
    await addDoc(notesCollectionRef, {
      user: currentUser,
      title: newNote.title,
      content: newNote.content,
      time: saveTime
    });
    getData()
  }


  ////EDIT
  const updateNote = async (updateNote) => {
    //passing updateNote from the note.jsx
    //updateTarget is set for firebase function "updateDoc" to recognize which document to update. 
    //It takes 3 parameter: the database, the collection and the document ID. 
    const updateTarget = doc(db, "notes", updateNote.id)
    const saveTime = new Date()
    await updateDoc(updateTarget, {
      user: currentUser,
      title: updateNote.title,
      content: updateNote.content,
      time: saveTime
    })
    getData()


  return (

    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Start/>}/>
        <Route path="/notes" element={<Keeper/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <Footer/>
    </Router>


  //Rendering the result
  return (
    <div>
      <Header
        login={loginWithGoogle}
      />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            {...noteItem}
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