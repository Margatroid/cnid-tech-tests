# Option 1 submission for CNI

Hi. I learned Express to build a simple app that will render articles over HTML from the dataset.

## Quickstart

Clone the repo and use Docker to quickly get the development server up and running.
```
docker build -t option1 .
docker run -d -p 3000:3000 option1
```

Alternatively you can clone the repo and install the dependencies locally.
```
npm install
npm start
```

In both instances the app will run on localhost:3000.

## Tests

If you have the dependencies installed locally you can run the tests with `npm test`.

## My local environment.

I tested this entirely on a Linux desktop with:

* Node 9.5.0
* npm 5.6.0
* Chromium 64.0.3282.167
* Firefox 58.0.2

If any problems arise, it may be due to differences in operating system, Node or browsers.
