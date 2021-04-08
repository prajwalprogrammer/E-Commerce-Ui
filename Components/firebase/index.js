import * as firebase from "firebase";
import "firebase/storage";

import React,{useState} from 'react'
import { UpdateImage } from "../Dashboard/AxiosUrl";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDKHQ51z-7BQx-qX-v3xHv7oq8BOSVXj00",
  authDomain: "mwcdispdepot-df9c9.firebaseapp.com",
  projectId: "mwcdispdepot-df9c9",
  storageBucket: "mwcdispdepot-df9c9.appspot.com",
  messagingSenderId: "627570747617",
  appId: "1:627570747617:web:cc97def92a82c43436efa0",
  measurementId: "G-J5B954DFWW",
};

firebase.initializeApp(firebaseConfig);

export async function UploadImage(uri, acc,ProfileDetails){
  const storage = firebase.storage();
  const response = await fetch(uri);
  var id = Math.floor(Math.random() * 1000);
  const blob = await response.blob();
  var URL
  var ref = firebase.storage().ref(`/salesId`).child(`/${acc}/${id}`).put(blob);
  
  await ref.on(
    "state_changed",
    (snapshot) => {},
    (err) => {
      console.log(err);
    },
    () => {
      storage
        .ref(`/salesId`)
        .child(`/${acc}/${id}`)
        .getDownloadURL()
        .then(async (url) => {
          URL = await url
          console.log(url)
         await UpdateImage(url,ProfileDetails).then((res)=>{return res;})
        });
    }
  );
  //return URL
};
