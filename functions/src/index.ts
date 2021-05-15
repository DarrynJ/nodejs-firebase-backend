import * as functions from "firebase-functions";
import * as firebase from "firebase-admin";
import * as express from "express";

//
// Initialize the firebase application to allow connection to database
const firebaseApp = firebase.initializeApp(functions.config().firebase);

//
// Create a function that retrieves data from your firebase database
function getData() {
  // Add your database reference here.
    const databaseReference = firebaseApp.database().ref("your-reference-here"); 

  //
  // Execute a call to retrieve the data ONCE
  return databaseReference.once("value").then((snapshot) => snapshot.val());
}

//
// Initialize your server
const server = express();

//
// Map your end-point to retrieve some data
server.get("/get-my-random-data", (request, response) => {
  //
  // Set your header values here, for example Cache-Control
  response.set("Cache-Control", "public, max-age=300, s-maxage=600");

  //
  // Execute your get from here to retrieve your data from your firebase database
  getData().then((result) => {
    // Return your data in json for example
    response.json(result);
  });
});

//
// Handle your functions requests by passing in your server instance
export const app = functions.https.onRequest(server);
