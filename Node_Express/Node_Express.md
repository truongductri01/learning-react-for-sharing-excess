# Node JS and Express

We will use version v14.8.0

### Create web server

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
