# Node JS and Express

We will use version v14.8.0

# Create web server

module: http
<br >
create a server?

```javascript
const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello World");
});
```

Then just make the app listen to a specific port

```javascript
app.listen(3000);
```

We can return a simple JSON format data also

```javascript
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

const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(notes));
});
```

<strong>What are others type of Content besides application/json?</strong>

# Express

a library that work with the built-in http module. has a more pleasing interface for developer and a better abstration for general use

Advantages over http:

1. Clear definition for each of the routes
2. Simple declaration of the app
3. Auto transform data into correct format
