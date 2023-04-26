import http              from 'http';
import fs                from 'fs';
import path              from 'path';
import { Server }        from 'socket.io'
import { fileURLToPath } from 'url';

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const root = path.join(__dirName,'../../../')
// console.log(root);


const httpServer = http.createServer((req,rep)=>{
  function getMIME() {
    switch (true) {
      case req.url.endsWith('.html') :
        return 'text/html';
      case req.url.endsWith('js') :
        return 'text/javascript';
      case req.url.endsWith('.css') :
        return 'text/css'
    }
  }
  function autoResponse(statusCode, write=req.url, MIME=getMIME()) {
    rep.writeHead(statusCode, {'Content-Type':`${MIME}; charset=utf-8;`});
    rep.write(fs.readFileSync(path.join(root,write)));
    rep.end();
  }
  if (req.url === '/' || req.url.includes('html/index.html')) {
    rep.writeHead(200, {'Content-Type':'text/html'});
    rep.write(fs.readFileSync(path.join(root,'src/views/html/index.html')));
    return rep.end();
  }
  try {
    autoResponse(200);
  } catch (e) {
    autoResponse(404, 'src/views/html/loginFail.html');
  }
})
  .listen(8080,()=>{
    console.log('server on!')
  })

const io = new Server(httpServer, { path : '/socket.io'});

io.on('connection', (socket)=>{
  const req       = socket.request;
  const socketIP  = req.connection.remoteAddress;
  socket.on('disconnect', ()=>{
    console.log(socketIP, socket.id);
    clearInterval(socket.interval);
  })
  socket.on('newUser', (data)=>{
    socket.emit('newUser',`[${data}]님 환영합니다`)
  })
  socket.on('chat', (data)=>{
    socket.emit('chat', data);
    console.log('chat');
  })
})