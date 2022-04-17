# 기술 설계 문서

# 1. Tech Stack / Library

## Front-End

- React-Native
- Native Base
- Apollo Client

## Back-End

- Spring Boot
- MySQL
- AWS EC2

## Data Fetching

- GraphQL

# 2. System Architecture

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f4bb65e5-3aa5-4151-8638-1aadeb2e5b99/Untitled.png)

# 3. ER Diagram

![Untitled Diagram.drawio (2).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6c0b13cc-dde1-4def-b803-e083f625e77e/Untitled_Diagram.drawio_(2).png)

# 4. Data Flow

## 기능 별 Data Flow

### 1. 스토어 검색, 지도 표시(사용자 위치 기준) 기능 - Main

- 사용자는 주변 스토어를 검색할 수 있다.
- 어플리케이션은 스토어의 위치 정보를 사용자에게 지도로 보여준다.

![Untitled Diagram.drawio (4).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/21dce605-d388-4da9-9d66-381ab3a979e1/Untitled_Diagram.drawio_(4).png)

### 2. QR 반납 기능 - Main

- 사용자는 반납 인증을 위한 QR 코드를 생성할 수 있다.
- 스토어는 사용자의 QR 코드를 촬영해 인증한다.
- 어플리케이션은 사용자의 인증된 반납 정보를 저장한다.

![Untitled Diagram.drawio (5).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a04a150f-859e-4097-bc2d-9c54b926e776/Untitled_Diagram.drawio_(5).png)

### 3. 스토어 리뷰 기능 - Sub

- 사용자는 스토어에 대해 리뷰를 작성할 수 있다.
    
    
    ![Untitled Diagram.drawio (6).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/78f6d279-9583-4598-8aa6-d6affde2a93e/Untitled_Diagram.drawio_(6).png)
    

# 5. Open API

- Kakao Social Login API
- Naver Map API
- react-native-qrcode-scanner

# 6. Demo Environment

- Android Virtual Device
