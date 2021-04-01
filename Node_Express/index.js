// Simple Web server
const express = require("express");
const app = express();
const cors = require("cors");

// utilize expree json-parser for the purpose of creating note later
const middleware = (request, response, next) => {
  console.log("method:", request.body);
  console.log("path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next(); // yeilds the control to the next middle ware
};

app.use(cors());
app.use(express.json());
app.use(middleware); // should be after the body has been jsonify

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

// -----------------------------------------------------------------------------------------
// Create new note
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};
app.post("/api/notes", (request, response) => {
  const body = request.body; // access and retrieve data from request with the help of json-parser

  // Validate the body's content
  if (!body.content) {
    return response.status(404).json({
      error: "content missing",
    });
  }

  // Give the note a default body definition (avoid other information passing in)
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };

  notes.push(note);
  response.json(note);
});

app.put("/api/notes/:id", (request, response) => {
  const body = request.body;
  console.log("Body >>>", body);
  if (!"important" in body) {
    response.status(404).json({ error: "No important in the body" });
  } else {
    const id = request.params.id;
    notes = notes.map((note) => {
      if (note.id != id) {
        return note;
      } else {
        return { ...note, important: body.important };
      }
    });
    const note = notes.find((note) => note.id == id);
    if (note) {
      return response.send(note);
    } else {
      return response.status(404).json({ error: "note not exist" });
    }
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log("Server Running on port", PORT));
