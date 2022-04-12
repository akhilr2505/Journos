import React, { Component, Suspense } from "react";
import axios from "axios";
import "./Entries.css";
import {Button} from 'react-bootstrap';
import {useState, useEffect} from "react";
import {db} from "../firebase"
import { getDoc, doc, query, collection, onSnapshot} from "firebase/firestore"
import { useUserAuth } from "../context/UserAuthContext";
import { FirebaseError } from "firebase/app";

function Entries() {
  const [entries, setEntries] = useState([])
  const {  user } = useUserAuth();

  const id=user.email;
  console.log(id)

  useEffect(() => {
    const ent = query(collection(db, "users", "akhil@gmail.com", "entries"));
            onSnapshot(ent, (querySnapshot) => {
                setEntries(querySnapshot.docs.map(entry => entry.data()))
            });
  }, [])
   
    
  return (
    <div className="outerCardDiv">
    {entries.map((entry) => {
        return  <div className="cardDiv">
         <div className="">
           <h5 className="cardTitle">{entry.title}</h5>
         </div>
         <div className="cardBody">
           <p className="cardText">{entry.content}</p>
         </div>
         <div className="cardFooter">
           {/* <Button className="editButton" variant="primary" size="sm">
             Edit
           </Button> */}

           <Button className="deleteButton" variant="danger" size="sm">
             Delete
           </Button>
         </div>
       </div>
      })}
    </div>
   )
}

export default Entries


