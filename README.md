# Node-React-Flux Starter App

> Gulp ready Node.js application structure with everything you need to hit the ground running with React.js, Flux, and Sass.

Let's face it, getting React to work with Flux is not as straightforward as it seems, and compiling your React files, bundling them into one standalone Javascript file with Browserify and Gulp can be another time wasting challenge. Things that should take 10 to 15 minutes minutes, end up taking forever.

At Visionist, we understand how frustrating it can be getting all those technologies set up to then finally start coding something relevant, so we decided to give Flux React developers a hand. With this starter template, we hope to simplify the process of starting Node.js applications leveraging React and Flux. We tried to document most of the React-Flux interaction code in a very straightforward, easy-to-understand manner, so that anyone familiar with Node and React can pick it up fast. Everything is replaceable, so just follow the sample code's lead, and you should be good to go.

## What about Sass?
Don't worry, Sass is in there too. We added a Sass directory inside src/ for writing all of your Sass files. We also made Gulp watch over your Sass files to compile on save - see below.

## So what exactly will Gulp do for me?
Mostly everything that you shouldn't be worrying about. You focus on writing your code inside the src/ directory, and Gulp will compile whatever needs to be compiled and place them inside the distribution (dist/) directory that Express happens to be pointing at.

## Let's get started
1. Clone the repository
```
git clone https://github.com/VisionistInc/node-react-flux.git
```

2. Go into the cloned repository's directory
```
cd node-react-flux
```

3. Install Gulp and Nodemon globally
```
npm install -g gulp
npm install -g nodemon
```

4. Install dependencies
```
npm install
```

5. Start Gulp
```
gulp
```
Upon start, Gulp will automatically compile everything that needs to be compiled, and place it inside the distribution (dist/) directory for you. After initial load, it'll watch over your files, updating dist/ on save. Caught errors within Gulp will be displayed here.

6. Open another Terminal/Command-Line window or tab, and start the Node app:
```
nodemon
```
Nodemon will watch over your Node server files and will restart the server automatically for you.
