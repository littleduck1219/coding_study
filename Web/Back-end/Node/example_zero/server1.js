const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req, res) => {
    try {
        // 브라우저별로 인식의 범위가 다름, 사파리의 경우 writeHead를 사용하지 않으면 HTML을 인식을 못함
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        const data = await fs.readFile('./server1.html');
        res.end(data);
    } catch (error) {
        console.log(error);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }); // plain 일반 메세지
        res.end(error.message);
    }

}).listen(8080);

server.on('listening', () => {
    console.log('8080번 포트에서 서버 대기 중입니다!');
});

server.on('error', (error) => {
    console.log(error);
});