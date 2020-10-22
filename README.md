# Shop App

React 학습용 쇼핑몰 어플리케이션입니다.

- client: 리액트로 구현하였습니다. 사용한 라이브러리로는

  - Redux: 상태 관리용 라이브러리입니다. 파일 구조는 Ducks 패턴으로 작성하였습니다.
  - Redux-Thunk: 상태 관리 과정에서 HTTP 비동기 작업을 추가하기 위한 미들웨어입니다.
  - Axios: 비동기 HTTP 통신 라이브러리입니다.
  - Formik: Html Form 의 상태 관리와 regulation 설정, 관련 helper 메소드들을 제공하는 라이브러리입니다.
  - Styled-Components: 스타일을 가지는 컴포넌트를 만들 수 있도록 하는 CSS-IN-JS 라이브러리입니다.
  - Antd: UI 라이브러리입니다.

- server: Node JS로 구현하였습니다. 사용한 라이브러리로는
  - Express: Node 경량 서버 프레임워크입니다.
  - dotenv: 환경 변수 관리 라이브러리입니다.
  - multer: 파일 업로드 관련 라이브러리입니다.
  - jimp: 이미지 처리 라이브러리입니다.
  - Json Web Token: 토큰 기반 인증 시스템을 구현한 라이브러리입니다.
  - mongoose: MongoDB 데이터베이스 관리 시스템입니다.

## Installation

npm 으로 server depency 및 clinet depency 설치

```bash
npm install

cd client
npm install
```

## Usage

API 서버 실행 후 client 폴더에서 클라이언트 서버 실행

```bash
npm run server

cd client
npm start
```

## Reference

https://github.com/jaewonhimnae/react-shop-app
