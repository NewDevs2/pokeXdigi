import fs from "fs";


export default function repPageWrite(filepath, rep, Type) {
  const contentType = ["text/html; charset=UTF-8;", "text/css; charset=UTF-8;", "text/javascript; charset=UTF-8;"]
  
  const page = fs.readFileSync(
    filepath,
    "UTF-8"
  );

  contentType.forEach((type)=>{
    if(type.includes(Type)){
      rep.writeHead(200, { "Content-Type": type });
    }
  })
  rep.write(page);
  rep.end();
}
