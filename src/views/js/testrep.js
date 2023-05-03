    const cookies = document.cookie.split('; ');
    const cookieMap = {};
    cookies.forEach((cookie) => {
      const [name, value] = cookie.split('=');
      cookieMap[name] = value;
    });

    console.log(cookieMap);
    // ! user 값이 없을 때는 값이 안뜨게 조건문을 걸어준다.
    if(cookieMap.User !== undefined){
    const root = document.createElement('div');
    root.innerText = `어서오세여 고객니임 ^_^ ${cookieMap.User}`;
    document.body.appendChild(root);
  }