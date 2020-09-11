# boiler_plate

## Study

- https://www.newline.co/courses/tinyhouse-react-masterclass/lesson_9.2-styling-with-ant-design

## Library

### dotenv

- 환경 변수 관리하는 라이브러리

### body-parser

- 요청(Request)의 본문을 해석해주는 미들웨어
- Express v4.16.0 기준, express 에서 built-in body-parser 제공

## NPM vs NPX

- `npm` 은 Node.js 의 **의존성**과 **패키지 관리**를 위한 패키지 매니저
- `npx` 는 Node 패키지를 실행시키는 하나의 도구이며 **설치하지 않고도** 무거운 패키지와 같은 것들을 **오직 실행만 시킬 수 있는** 도구!

## CRA to Our Boilerplate

- HOC 개념

## CORS(Cross-Origin Resource Sharing) 이슈, Proxy 설정

- 두 개의 다른 포트를 가지고 있는 서버는 아무 설정없이 Request 를 보낼 수 없다.
- 해결을 위해서는
  - 서버 쪽에서 따로 허용 설정을 하는 방법
  - Proxy 설정 사용

## 로그인

https://www.daleseo.com/react-router-authentication/

https://bezkoder.com/react-hooks-jwt-auth/
https://bezkoder.com/node-js-mongodb-auth-jwt/
https://bezkoder.com/react-redux-jwt-auth/

https://github.com/cornflourblue/react-hooks-redux-registration-login-example/tree/master/src

## 에러 핸들링

https://itnext.io/centralizing-api-error-handling-in-react-apps-810b2be1d39d

https://www.pluralsight.com/guides/centralized-error-handing-with-react-and-redux

https://pjh3749.tistory.com/273 (9 / 11)
https://code-maze.com/react-net-core-error-handling/ ( 9/11)

### The Design

**Translating Error Codes to Human Readable Messages**

- 백엔드에서 platform-specific한 error 들을 정의해놓고 관리한다.
- 프론트엔드에서는 에러를 탐지하고 메세지를 유저에게 보여주는 데 집중한다.

**Single Point of Handling**

- 에러를 다룰 때 컨트롤하는 중심 부분이 있어야 한다.
- 나중에 수정 사항이 생길 때 훨씬 수월하게 작업 가능하다.

**Less Future Work**

- API 의 Response 로부터 명시적으로 에러를 체크하지 않고, 핸들링 과정에서 Response 의 내용으로 알아서 처리하는 방식이 이상적이다.

**Design approach**

1. 데이터 소스로부터 예상하는 response 객체의 형태를 결정한다.
2. API 상호작용 지점을 구성하여 응답 객체와 예상되는 형태가 일치하는지 확인한다.
3. 에러 리듀서를 만들어서 에러 발생을 관찰하고 따로 error state 에 등록한다.
4. 에러 액션을 가지고 수동으로 에러를 발생시키는 구조를 만든다.
5. 에러 사항을 보여주는 재사용 가능한 컴포넌트를 만든다.

### Response Object Shape

```
{
  status: "ok" or "error", // 선택적으로 사용, API 요청 상태를 명시적으로 보여줌
  data: [] or {},          // 실제 API 로부터 받은 response data
  messages: [] or string,            // 요청이 성공했음을 보여주는 readable string
  errors: [] or string,              // 요청이 실패했음을 보여주는 readable string
}
```

- 이렇게 객체 모습을 작성하면 에러 메시지를 정확하게 확인 가능하다.
- 다만, 써드파티 API 로부터의 response 객체는 우리가 따로 변형시켜줘야 한다.

### Structuring the API Calls
