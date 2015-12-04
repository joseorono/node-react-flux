# Node-React-Flux Starter App

> Gulp ready Node.js application structure with everything you need to hit the ground running with React.js, Flux, and Sass.

Let's face it, getting React to work with Flux is not as straightforward as it seems, and compiling your React files, bundling them into one standalone Javascript file with Browserify and Gulp can be another time wasting challenge. Things that should take 10 to 15 minutes minutes, end up taking forever.

At Visionist, we understand how frustrating it can be getting all those technologies set up to then finally start coding something relevant, so we decided to give Flux React developers a hand. With this starter template, we hope to simplify the process of starting Node.js applications leveraging React and Flux. We tried to document most of the React-Flux interaction code in a very straightforward, easy-to-understand manner, so that anyone familiar with Node and React can pick it up fast. Everything is replaceable, so just follow the sample code's lead, and you should be good to go.

## What about Sass?
Don't worry, Sass is in there too. We added a Sass directory inside src/ for writing all of your Sass files. We also made Gulp watch over your Sass files to compile on save - see below.

## So what exactly will Gulp do for me?
Mostly everything that you shouldn't be worrying about. You focus on writing your code inside the src/ directory, and Gulp will compile whatever needs to be compiled and place them inside the distribution (dist/) directory that Express happens to be pointing at.

## Get Started
* Clone the repository
```
git clone git@github.com:VisionistInc/node-react-flux.git
```

* Go into the cloned repository's directory
```
cd node-react-flux
```

* Install dependencies
```
npm install
```

* Install Gulp
```
npm install -g gulp
```

## Building the static files
Bundled static files will live inside the ```./dist``` directory
```
+ dist/
    |-- index.html
    |-- App.js
    \-- App.css
```

- Bundle static files and exit on finish

  ```
  npm run-script build
  ```

## Running the application for Development
- Bundle the static files, watch over development files, and start the server
```
npm run-script dev
```
Gulp will watch over all of your files and rebuild on save. It will also restart the Node server whenever you edit or modify any of the server files

- Open your browser and go to ```http://localhost:3003```

## Running the application for Production
- Bundle the static files and start the server
```
npm start
```

- Open your browser and go to ```http://localhost:3003```

## Running the extended application with extra examples

```
gulp --gulpfile gulpfileExtras.js
```

There should be a random number generator component and a react-threejs component that shows off some simple webgl graphics. The source
files for the extended example code live in the "extras" folder.

## References
- [Architecting React.js Apps with Flux](http://tylermcginnis.com/reactjs-tutorial-pt-3-architecting-react-js-apps-with-flux/) by Tyler McGinnis, April 16, 2015
