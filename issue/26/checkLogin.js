  const cookie = (async ()=>{
    const respones = await fetch('/checkLogin')
    const result   = await respones.json();
    return result
  })();