import cont from './opendb.js'
cont.connect(); //! db 접속
cont.query('select * from jt',(err,f,d) => {
  if(err){
    console.log(err);
  }
  console.log(f);
})

