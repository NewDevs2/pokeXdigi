# 2조 newdevs
Project name = 'IA'
임시 프로젝트 이름 : '이야'

## <span style="backgrond-color: (255, 255, 209)">제작 순서</span>
<span style="color: (255, 255, 209); font-size: 1.2em">1. 설계를 근거로 DB 제작, Table구성</span>
- Database 이름 : 'IA'
  - IA를 구글에 검색하면 나오는 결과가 '이야'가 인상이 깊었기에 팀원과 합의 과정을 거쳐 임시 서비스 네임으로 결정 - (23.03.31)
  - 워크벤치와 Command Line Client를 병행하며 사용하기로 결정.
    -> 워크벤치는 사용 법을 아는 기준 하에 사용 가능하며, 처음 사용하는 기능이나 워크벤치로 찾아 볼 수 있었던 기능은 추후 개인 연습 과정을 거쳐 CLI로도 사용이 가능하도록 연습할 예정 - (23.03.31)
- Table 구성 :
  - user_information
    - 회원가입시 정보 저장 테이블 : - (23.03.31)  
    아이디, 비밀번호 등 기초적인 회원의 정보를 저장하고 관리하는 테이블
      - 총 11개의 열이 있으며
        - 데이터 타입으로는 INT,VARCHAR, BIGINT, TINYINT, TIMESTAMP 사용
        - Default설정으로는 Not Null, Auto_increment, Current_timestamp 사용