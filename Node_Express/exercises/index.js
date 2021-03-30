/**
 * Set up a server which return a hardcoded phone book
 * Exercises source: https://fullstackopen.com/en/part3/node_js_and_express#exercises-3-1-3-6
 *
 */
const express = require("express");
const app = express();

let phoneBook = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "DAn Abramov", number: "12-43-234345" },
  { id: 4, name: "mary poppendick", number: "39-23-6423122" },
];

app.get("/api/persons", (request, response) => {
  response.json(phoneBook);
});
app.get("/info", (request, response) => {
  const amountOfPeople = phoneBook.length;
  const date = new Date();
  response.send(
    `<p>Phonebook has info for ${amountOfPeople} people</p>
        <p>${date}</p>
        `
  );
});
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  console.log(id);
  const person = phoneBook.find((person) => person.id == id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
app.delete("/api/persons/:id/delete", (request, response) => {
  const id = request.params.id;
  const person = phoneBook.find((person) => person.id == id);
  if (person) {
    phoneBook = phoneBook.filter((person) => person.id != id);
    response.send(`Successfully delete the person with the id of ${id}`);
  } else {
    response.status(404).json({
      error: `${id} is not a valid person's id`,
    });
  }
});

// Give the app a port to listen to
const PORT = 3001;
app.listen(PORT);
console.log("this is the exercise");
