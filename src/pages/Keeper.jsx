import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, orderBy } from "firebase/firestore"

function Keeper() {


    //Setup "notes" State
    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState(null)

    //CRUD of the notes
    ////READ
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

    ////ADD
    const addNote = async (newNote) => {
        const saveTime = new Date()
        await addDoc(notesCollectionRef, { title: newNote.title, content: newNote.content, time: saveTime });
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
            title: updateNote.title,
            content: updateNote.content,
            time: saveTime
        })
        getData()

    }

    ////DELETE

    const deleteNote = async (id) => {
        const toDelete = doc(db, "notes", id)
        await deleteDoc(toDelete)
        getData()
    }


    //Rendering the result
    return (
        <div>
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
        </div>
    )
}

export default Keeper