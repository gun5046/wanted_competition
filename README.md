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

![image](https://user-images.githubusercontent.com/48385816/163705364-ac1ba8f2-65fc-4d07-a626-f8ad727ddc71.png)


# 3. ER Diagram

![image](https://user-images.githubusercontent.com/48385816/163705377-97a4b8a9-d0c2-4cd2-a04b-3252a61ab616.png)

# 4. Data Flow

## 기능 별 Data Flow

### 1. 스토어 검색, 지도 표시(사용자 위치 기준) 기능 - Main

- 사용자는 주변 스토어를 검색할 수 있다.
- 어플리케이션은 스토어의 위치 정보를 사용자에게 지도로 보여준다.

![image](https://user-images.githubusercontent.com/48385816/163705387-d8ba230e-7d30-46c5-9fa4-d4b949e06ed0.png)

### 2. QR 반납 기능 - Main

- 사용자는 반납 인증을 위한 QR 코드를 생성할 수 있다.
- 스토어는 사용자의 QR 코드를 촬영해 인증한다.
- 어플리케이션은 사용자의 인증된 반납 정보를 저장한다.

![image](https://user-images.githubusercontent.com/48385816/163705392-87cd8706-4ba7-4c26-bee6-6aaf8614b72f.png)

### 3. 스토어 리뷰 기능 - Sub

- 사용자는 스토어에 대해 리뷰를 작성할 수 있다.
    
    
    ![image](https://user-images.githubusercontent.com/48385816/163705402-819d8076-45ae-43b9-a46c-4a8e15705b57.png)

    

# 5. Open API

- Kakao Social Login API
- Naver Map API
- react-native-qrcode-scanner

# 6. Demo Environment

- Android Virtual Device
