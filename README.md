<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## GraphQL Examples

URL: `http://localhost:3000/graphql`

![image](https://github.com/laurindo/nestjs-playground/assets/2501144/8d3a563f-93df-48fb-a8e6-d136fde6f466)

```bash
  mutation Signup($credentialData: CredentialModelInput!) {
    signup(credentialData: $credentialData) {
      uuid
      email
      accessToken
      isAdmin
      roles
    }
  }

  // PAYLOAD TO CREATE NEW CREDENTIAL
  {
    "credentialData": {
      "email": "email@domain.com",
      "password": "123456",
      "isAdmin": true,
      "roles": ["Admin"]
    }
  }

  // RESPONSE
  {
    "data": {
      "signup": {
        "uuid": "99d0f196-d312-4a27-bae1-e02c3d942ba9",
        "email": "email@domain.com",
        "accessToken": "<jwt token generated>",
        "isAdmin": true,
        "roles": ["admin"]
      }
    }
  }
```

```bash
  // Query
  query Signin($credentialData: CredentialModelInput!) {
    signin(credentialData: $credentialData) {
      uuid
      email
    }
  }
```

```bash
  // WRONG PASSWORD
  {
    "credentialData": {
      "email": "demo2@test.com",
      "password": "1234562"
    }
  }

  // CORRECT PASSWORD
  {
    "credentialData": {
      "email": "demo2@test.com",
      "password": "123456"
    }
  }
```

```bash
  // SUCCESS RESPONSE
  {
    "data": {
      "signin": {
        "uuid": "d96c4197-da93-485b-9f1f-8ea971334764",
        "email": "demo2@test.com"
      }
    }
  }

  // RESPONSE FROM EXCEPTION
  {
    "errors": [
      {
        "message": "Forbidden Access",
        "locations": []
      },
    ],
    path: ["signin"],
    extensions: {},
    data: null
  }
```

```bash
query FindLoggedUser {
  findLoggedUser {
    email
  }
}

// Go to HTTP HEADERS
{
  "Authorization": "Bearer <jwt token>"
}

// RESPONSE
{
  "data": {
    "findUser": {
      "email": "demo4@test.com"
    }
  }
}

```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
