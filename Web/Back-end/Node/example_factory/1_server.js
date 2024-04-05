const http = require('http');
const url = require('url');

const host = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    const path = url.parse(req.url).pathname;

    if (path === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<H1>Hello World</H1>');
    } else if (path === '/post') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<H1>Post page!</H1>');
    } else if (path === '/user') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<H1>Post page!</H1>');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<H1>404 page!</H1>');

    }
})

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})
// const