const data = fs.readFileSync('../HTML/login.html','utf-8');
rep.writeHead(200,{'Content-Tpye':'text/html; charset=utf-8'});
rep.write(data);
rep.end();

const data = fs.readFileSync('../CSS/login.css','utf-8');
rep.writeHead(200,{'Content-Tpye':'text/css; charset=utf-8'});
rep.write(data);
rep.end();

const data = fs.readFileSync('../JS/login.js','utf-8');
rep.writeHead(200,{'Content-Tpye':'text/javascript; charset=utf-8'});
rep.write(data);
rep.end();