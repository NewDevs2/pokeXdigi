const mainText = () => {
  `  <form action="/login" name="form-one" accept-charset="utf-8">
  <label for="name">이름</label>
    <input type="text" id="name" /><br><br>
    <label for="jumin">주민등록번호</label>
    <input type="text" id="jumin" name="security_number" pattern="#d{6} #-#d{7}" title="123456-1234567 93 935F/8" /><br><br>
    <label for="id">ID</label>
    <input type="text" id="id" name="id" /><br><br>
    <label for="password">이름</label>
    <input type="password" name="password" id="password" /><br><br>
    <input type="submit" value="submit" />
 
</form>`
}

