# ExpressJS-MongoDB TypeScript boilerplate

Boilerplate for the backend part of the MERN stack. Is it mainly composed of an ExpressJS App written in TypeScript.

## Quickstart

### Requirements :
- NodeJS
- NPM
- MongoDB

Once these requirements are met, you can clone the repository and start your own project !
```
git clone git@github.com:stressGC/MERN-Backend.git <localName>
cd <localName>
npm install
npm run watch # dev mode, make sure MongoDB is running
```

## Components :
Main components contained in this boilerplate.
- TypeScript auto-compilator
- TSLint
- Regular NodeJS API components : ExpressJS, Mongoose...
- .env variables
- Loggers : Winston & Morgan
- Git files : .gitignore & .gitattributes
- Development daemon
- Various basic HTTP protections (CORS / helmet...)
- Various utility modules (bodyparser...)
- JSDoc support
- Mongoose model example

## Roadmap:
Things I am planning to add to this project.
- Continous Integration Tool
- Dockerfile
- log file setup in .env
- JSDoc implementation

## Author
**Georges Cosson** : [LinkedIn](https://www.linkedin.com/in/georges-cosson/) - [GitHub](https://github.com/stressGC)

## Licence

MIT License

Copyright (c) 2019 G. Cosson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
