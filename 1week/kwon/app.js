import http from 'http';
import qs from 'qs';
const twoText = (namedata, jumin, id, pw) => {
  return
  `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  
  <body>
   
  <p>   ${namedata}  </p>
  <p>  ${jumin}   </p>
  <p>   ${id}  </p>
  <p>   ${pw}  </p>
  
  </body>
  
  </html>`
    ;
}

const mainText = () => {

  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  
  <body>
    <form action="/login" name="form-one" accept-charset="utf-8" method="post">
      <label for="name">이름</label>
        <input type="text" id="name" /><br><br>
        <label for="jumin">주민등록번호</label>
        <input type="text" id="jumin" name="security_number"  /><br><br>
        <label for="id">ID</label>
        <input type="text" id="id" name="id" /><br><br>
        <label for="password">비밀번호</label>
        <input type="password" name="password" id="password" /><br><br>
        <input type="submit" value="submit" />
     
    </form>
  
  
  </body>
  
  </html>`;

}

const server = http.createServer(function (requst, response) {
  if(method === 'get') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text-html');
    response.end(mainText());
  }
  if(method === 'post') {
    let testdata = '';
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text-html');
    requst.on('data', function (data) {
      testdata = data;
      return testdata;
    })

    requst.on('end', function () {

      let qsdata = qs.parse(testdata);
      response.end(console.log(qsdata));

    })
  }

});

server.listen(2222, function (error) {
  if (error) { console.log('실패') }
  else {
    console.log('성공');
  }
})