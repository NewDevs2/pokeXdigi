function getContentType () {
  switch (true) {
    case req.url.endsWith('.html') :
      return 'text/html'
    case req.url.endsWith('.js') :
      return 'text/javascript'
    case req.url.endsWith('.css') :
      return 'text/css'
    case req.url.endsWith('.ico') :
      return 'image/x-icon'
    default :
      return 'text/plain'
  }
}

// * -------------------------------------- * //

const Mrep = (stateCode,write,type=getContentType())=> {
  rep.writeHead(stateCode, {'Content-Type':`${type}; charset=utf-8`});
  if (Array.isArray(write)) {
    write.forEach(element=>{
      if (element.endsWith('.html')||element.endsWith('.js')||element.endsWith('.css')) {
        rep.write(fs.readFileSync(path.join(root,element),'utf-8'));
      } else {
        rep.write(element);
      }
    })
  }
  rep.end();
}

// ! 자동응답 ==============================================

try {
  console.log(`응답 작성 안한 페이지 자동 응답 : ${req.url}`)
  return Mrep(200,[req.url])
  } catch (e) {
    console.log(`없는 페이지 요청 : ${req.url}`);
    return Mrep(404,['<h1>요청하신 페이지는 없는 페이지 입니다. (404 Not found)</h1>'],'text/html');
  }