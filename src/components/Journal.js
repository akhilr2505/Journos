import React from 'react'
import {useState} from "react";
import "./Journal.css"
import { getDoc, doc, query, collection, onSnapshot, setDoc} from "firebase/firestore"
import {db} from "../firebase"


const Journal = () => {

const [title, setTitle] = useState();
const [content, setContent] = useState();

const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
}

const handleContent = (e) => {
    e.preventDefault();
    setContent(e.target.value);
}

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title)
    console.log(content)
    // const ent = query(collection(db, "users", "akhil@gmail.com", "entries"));
    //         onSnapshot(ent, (querySnapshot) => {
    //             setEntries(querySnapshot.docs.map(entry => entry.data()))
    //         });
    setDoc(doc(db, "users", "akhil@gmail.com", "entries", title), {
        title: title,
        content: content
    })
    setTitle("");
    setContent("");
}

  return (
    <div className="journalForm">
        <form onSubmit={handleSubmit}>
          <div className="journalTitle">
            <label className="journalTitleLabel">Title</label>
            <input
              type="text"
              name="title"
              className="journalTitleInput"
              placeholder="Enter journal entry title"
              value={title}
              onChange={handleTitle}
              required
            />
          </div>
          <div className="journalContent">
            <label className="journalContentLabel">Content</label>
            <textarea
              className="journalContentInput"
              name="content"
              rows="3"
              placeholder="Enter journal entry..."
              value={content}
              onChange={handleContent}
              required
            />
          </div>
          <button className="saveButton">Save Note</button>
        </form>
      </div>
  )
}

export default Journal