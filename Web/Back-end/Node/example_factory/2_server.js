const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

app.get('/post', (req, res) => {
    res.send('<h1>Post World</h1>');
});

app.use((res, req) => {
    res.status(404).send('<h1>404 Page Not Found</h1>');
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
 })