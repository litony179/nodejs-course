// In this file, we are going to introduce the basics of NodeJsres.
// =====================================================================================================================================
// The require() function read a JavaScrip file, executes the file, and then proceeds to return the methods that are 
// within that file (module).

// You can require your own JS file with a path
// or built-in JS module.

const http = require('http');
const fs = require('fs');

// =====================================================================================================================================
// The createServer() object turns your computer into a server.
// This object takes in a "request listener" which is a function that will execute for every incoming request
const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);

    // We can also redirect information to diffeent 'routes' of our web application.
    // A route is basically just a place in our web apllication.
    const url = req.url;

    // We can also specify the method used (GET, POST, DELETE)
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter mesage</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>');
        res.write('</html>');
        return res.end()
    }

    if (url === '/message' && method === 'POST') {

        // The on() method allows to us to listen to events.
        // Here, we are listening to the 'data' event.
        // The 'data' event will be fired whenever a new chunk is ready.
        // The on() method also recieves a 'chuck' of data.
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })

        // The 'end' event is fired when the on() method finishes parsing all the information in the body.
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                // this is the "redirect" status code
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    // Here We can set headers to specify what information we are responding back to the client
    // In this case, we are responding with html content
    res.setHeader('Content-Type', 'text/html');

    // The write() function writes the contents of the response
    res.write('<html>');
    res.write('<head><title>My First page</title></head>');
    res.write('<body><h1>Hello from NodeJs</h1></body>');
    res.write('</html>');
    res.end()
});

// =====================================================================================================================================
// The listen() method actually starts a process where nodeJs will not immediately exit our script but nodeJs keeps running in the 
// background to listen to incoming requests.
server.listen(3000);








// =====================================================================================================================================
// Notes on Asynchronous Functions
// =====================================================================================================================================
// Since JavaScript is a single-threaded programming language, this means that JS can only execute one process at a time.
//     -> This greatly simplifies the coding process because you do not have to worry about all the concurrency issues.
//     -> This also means that you can not run long operations such as network access without killing the other processes.
// This is where asynchronous JS comes into playres.
//     -> When we execute JS code, it is executed in order of the statements (hence the name synchronous JS)
// In asnychronous code, the whole point of it is to 'loop' the process that needs to keep running.
// This is not done by JS but rather it is done by APIs(different browsers use different sets of APIs to achieve the 'event loop).









// =====================================================================================================================================
// Some notes on Node.Js application life-cycle
// =====================================================================================================================================
// The life of a Node.js application start when we execute the application.
//      |
//      V
// Node then went through the file and parsed all the variables and the function
//      |
//      V
// Then we noticed that the node application did not close, it just kept running. We call This the "event loop".
// this "event loop" keeps running as long as there is processes or event listeners running. This is basically because, Node executes JS
// single threaded. 
//      |
//      V
// =====================================================================================================================================



// =====================================================================================================================================
// Comment on GET and POST requests
// =====================================================================================================================================

// A GET request asks for information from the server
// A POST request sends inforamtion to the server