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

# Nodemon

a library which watches the changes in node js and automatically reload the server

```
npm install --save-dev nodemon
```

"--save-dev" means we only need nodemon in the development stage.
<br>
After deploying, nodemon is not needed
<br>

To run nodemon: <code>nodemon index.js</code>

# REST

REST is an architectual style meant for building scalable web applications.

> One convention is to create the unique address for resources by combining the name of the resource type with the resource's unique identifier.
> <br>

What does this mean?

# Postman

a tool to test the CRUD operations more effectively

# REST Client Visual Studio

using REST Client to send and receive the request within the editor\
create a file ending with .rest \
paste in the request url \
Then click Send Request

# CRUD operations

1. Delete: using postman to send the delete request to the server
2. Create: sending a post request to the server. **Notice**: make sure the headers of the body is defined correctly based on the data type of the body's data (json, text, etc.)
   > Notice: define the body of the object wanted to create to avoid unnecessary information

**funy note**: .push() will return the array's new length while .concat() will return the new array version

# MiddleWare

functions used to handle request and response objects
has 3 parameters: request, response, and next
next is to yeild the control to the next middleware

# Same origin policy and CORS

this can happend if the api is requested from a different port. happens if you run frontend on local host 3000 and fetch an api from localhost 3001
