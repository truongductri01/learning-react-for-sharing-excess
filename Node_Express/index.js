// Simple Web server
const express = require("express");
const app = express();

// return a JSON file to the website
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

// Create different routes using express
// The routes has to be in the correct form
// unlike http, which return same reponse for every urls with similar formats (/ and /and)
app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});
app.get("/api/notes", (request, response) => {
  response.send(notes);
});

// The url param is passed with a better simplicity than django
app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => {
    console.log(note.id, typeof note.id, id, typeof id, note.id == id);
    return note.id == id;
  });
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// Delete resources through delete api operation
// Should be tested using application, such as POSTMAN
app.delete("/api/notes/:id/delete", (request, response) => {
  const id = Number(request.params.id);
  // Simply just remove the note out of the list
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => console.log("Server Running on port", PORT));
