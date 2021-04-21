const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    // This is to test if server is running
    // console.log('Hello from server!')

    const path = req.url;
    const method = req.method;
    if (path === '/') {
        res.write('<html>');
        res.write('<head><title>Users server</title></head>');
        res.write('<body><h1> This is a NodeJS server</h1></body>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="message"><button type="submit">submit user</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (path === '/users') {
        res.write('<html>');
        res.write('<head><title>Users server </title></head>');
        res.write('<body><ul><li>User 1</li></ul></body>');
        res.write('</html>');
        return res.end();
    }

    if (path === '/create-user' && method === 'POST') {
        req.on('data', (chunck) => {
            console.log(chunck);
        });
        req.on('end', () => {
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end()
        });
    }

});


server.listen(3001);