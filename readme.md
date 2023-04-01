# 2조 newdevs
Project name = 'IA'  
임시 프로젝트 이름 : '이야'
|구성인원|
|:---:|:---|
|팀장|박준형★|
|팀원|장루빈|
||권예준|
||곽윤호|
||성해경|

## 제작 순서
_**1. 설계를 근거로 DB 제작, Table구성**_
- Database 이름 : 'IA'
  - IA를 구글에 검색하면 나오는 결과가 '이야'가 인상이 깊었기에 <u>팀원과 합의 과정을 거쳐</u> 임시 서비스 네임으로 결정 - *(23.03.31)*
  - 워크벤치와 Command Line Client를 병행하며 사용하기로 결정.  
    -> 워크벤치는 사용 법을 아는 기준 하에 사용 가능하며, 처음 사용하는 기능이나 워크벤치로 찾아 볼 수 있었던 기능은 추후 개인 연습 과정을 거쳐 CLI로도 사용이 가능하도록 연습할 예정 - *(23.03.31)*
- DBMS : 팀 회의 간 협의를 거쳐
>MySQL 사용하기로 결정 - *(23.03.31)*
- DB 접속 계정
  |ID|memo|
  |:---:|:---|
  |root|'localhost'전용|
  |admin_개발자|개발자 전용 모든 권한 계정|
  |sign_master|로그인 전용 계정 - SELECT,INSERT만 가능|
  -  root : 'localhost'전용 계정으로 DB가 설치 된 데스크탑에서만 사용할 예정
  - admin_개발자 : 5명이 각각의 모든 권한을 가진 접속 계정을 가짐 - *(23.03.31)*
    - 5명 모두 CLI로 계정 만들기 시도 -> 권한 부여까지 완료 하였음
      - DB로 접속 권한만 설정 하였고, table 등 권한을 부여하지 못해 워크벤치로 해결하였고, 이를 추후 개인 연습을 통해 테이블의 권한까지 CLI로 부여하는 것을 연습하기로 결정 - *(23.03.31)*
- Table 구성 :
  - user_information - *(23.03.31)*
    - 회원가입시 정보 저장 테이블 :
    아이디, 비밀번호 등  기초적인 회원의 정보를 저장하고 관리하는 테이블
      - 총 11개의 열이 있으며
        - 데이터 타입으로는 INT,VARCHAR, BIGINT, TINYINT, TIMESTAMP 사용
        - Default설정으로는 Not Null, Auto_increment, Current_timestamp 사용