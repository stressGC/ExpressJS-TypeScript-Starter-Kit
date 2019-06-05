# ExpressJS-MongoDB TypeScript boilerplate

Boilerplate for the backend part of the MERN stack. Is it mainly composed of an ExpressJS App written in TypeScript.

[![CircleCI](https://circleci.com/gh/stressGC/ExpressJS-TypeScript-Starter-Kit.svg?style=svg)](https://circleci.com/gh/stressGC/ExpressJS-TypeScript-Starter-Kit)

## Quickstart

### Requirements
- NodeJS, downloadable [here](https://nodejs.org/en/)
- NPM, downloadable [here](https://www.npmjs.com/)
- MongoDB, downloadable [here](https://www.mongodb.com/)

### Installation
Once these requirements are met, you can clone the repository and start your own project !

```bash
git clone git@github.com:stressGC/MERN-Backend.git <localName>
cd <localName>
npm install
```
### Usage

#### Basic usage
Make sure MongoDB is running
```bash
npm run watch # development mode, hot reload
npm start # production mode
npm test # launches the tests
```
#### Advanced: deployment

Tutorial on [how to deploy a Node app to an AWS server](https://hackernoon.com/tutorial-creating-and-managing-a-node-js-server-on-aws-part-1-d67367ac5171).

Using tools like [PM2](http://pm2.keymetrics.io/) may be a more secure way of deploying to production.

This repository contains a [CircleCI](https://circleci.com/) configuration file, it automates testing, and deployment. It basically make sure the test script passes (**_npm test_**), then if the commit has been made to the master branch, it deploys to the server (**_npm run deploy_**). Some environment variables must be filled for it to work. 

A good tutorial is viewable on [Youtube](https://www.youtube.com/watch?v=0OjEx2UzLUI).

## Components
Main components contained in this boilerplate.

**API basics**
- ExpressJS
- Mongoose
- Loggers : Winston & Morgan
- HTTP protections (CORS / helmet...)
- Utility modules (bodyparser...)
- Error middlewares
- Request validation
- Environment variables
---
**DevOps**
- Tests (mocha & chai)
- CircleCI: test running
- CircleCI: auto deployment
--- 
**Development helpers**
- TypeScript auto-compilator
- Development daemon
- TSLint
- JSDoc support

## Project structure 
```
root
├── src
│   ├── controllers
│   ├── interfaces
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── validators
│   ├── utils
│   ├── app.ts
│   └── index.ts
├── test
│   ├── api
│   ├── unit
│   └── mocha.opts
└── [...]
```

## Roadmap
Things I am planning to add to this project.
- Add linting tests
- Dockerfile
- JWT handling

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

If you have any question regarding this repository, please contact me on [LinkedIn](https://www.linkedin.com/in/georges-cosson/).

## Author
**Georges Cosson** : [LinkedIn](https://www.linkedin.com/in/georges-cosson/) - [GitHub](https://github.com/stressGC)

## Licence

MIT License, Copyright (c) 2019 G. Cosson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
