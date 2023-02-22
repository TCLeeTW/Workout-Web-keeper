import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";



ReactDOM.render(<App />, document.getElementById("root"));


//Latest way of rendering React:
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );

//CHALLENGE:
//1. Implement the add note functionality.
//- Create a constant that keeps track of the title and content.
//- Pass the new note back to the App.
//- Add new note to an array.
//- Take array and render seperate Note components for each item.

//2. Implement the delete note functionality.
//- Callback from the Note component to trigger a delete function.
//- Use the filter function to filter out the item that needs deletion.
//- Pass a id over to the Note component, pass it back to the App when deleting.


//Self-Challenge:
//Done: Connect to firebase and enable firestore. 
//Add edit note feature     <--This is super hard!
    //First need to turn the note into editable mode-->Done
    //Second to update the editing back -->Done
    //save back to database-->Done
//Add login feature, refer to secret tree hall. 
//Render the notes by timestamp
//Identify user, and only show the user's content, so that it can actually be used. 