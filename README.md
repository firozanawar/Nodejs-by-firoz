I am Firoz Anwar from Delhi India, and I am an Android Engineer having 6+ experience in Android App Development. Along with my Android Skills, I love to explore new skills and technologies. 
Some of my Node.js basic learning to build an RESTful API using Nodejs and MongoDB is here. If you find it useful please don’t forget to Fork and Star.

Let’s get started !


# Node.js

### Introduction:-
Til 2009 the Javascript was able to run only inside a browser but in 2009 Creator of Node is Ryan Dahl came with an idea that why don't we run Javascript outside using the same Runtime environmen. So he taken Chrome's V8 engine and using C++ he executed Javascript outside of browser which is actually called Node.js. Node.js is a JavaScript runtime environment built on Chrome's V8 JavaScript engine. Node JS is a runtime environment for executing JavaScript code outside browser.  It is used for Backend Services like API (Application Programming Interface). It is used to build highly scalable, data intensive and real time apps. Node is something which can be run outside of Browser using Chrome’s V8 engine. NodeJS is used where capability is not available in browsers like FileSystem or network etc. Node is not a programming language or framework, it is a runtime environment for executing JavaScript code.
* Node is Non-Blocking Asynchronous.
Node applications are single-threaded. That means a single thread is used to
serve all clients.
* Node is ideal for I/O intensive apps. 
* Don’t use Node for CPU intensive applications like video encoding. 
* Essentially, Node is a C++ program that embeds Chrome’s v8 engine, the fastest
JS engine in the world.
* In Node, we don’t have browser environment objects such as window or the
document object. Instead, we have other objects that are not available in
browsers, such as objects for working with the file system, network, operating
system, etc.

Why Node.js ??
![NodeApp](https://user-images.githubusercontent.com/15997473/85196481-18725100-b2f8-11ea-8974-3c30c0cea0c3.png)

Features of Node.js

![NodeApp2](https://user-images.githubusercontent.com/15997473/85196485-2627d680-b2f8-11ea-97fe-fd06a90b0a87.png)

### Node Architecture:-

JavaScript engines in different browsers

![NodeApp3](https://user-images.githubusercontent.com/15997473/85196487-2922c700-b2f8-11ea-82ec-b706ef91b0c4.png)

### Miscellaneous:-
* To check Node is installed in your computer...
```
$node --version
```
* To run a Node.js code...
```
$node index.js  // Where index.js is created file
```
* Global Scope object in Javascript
```
Console.log, setTimeout(), clearTimeout(), setInterval, clearInterval(), window etc
```
Like in JS there is some global objects like documents or window. Same in Node.js we have few global things. Some of them are..
```
setTimeout(), clearTimeout()
```
Note:- document or window object is not there in Node.js
* In javascript we can call everything using the window. Like `window.console.log` but since there is no window in Node, there is something called global. We can use global here to access anything like..
`global.console.log, global.setTimeout...`
If you define a variable and access it using a global it will throw as “undefined” because it belongs to the current/module file only.
* Every file in Node is considered as a Module. All the variables and functions are defined to that file as scope to that module/file only (like private).
To know the current module just type 
```
console.log(module)
```
* One module can be export its functionality like variable or methods using `module.exports.anyNameHere = <export-items>`
And another module can get it using require like this
`Const logger = require(./logger.js)`
But using the above we are creating a whole object to access it, if we have only one function to export then no need to export a full object just do like this.
```
module.exports  = <export-items>
Const log = require(./logger.js)  // here now log is just the function not object.
log(‘message’);
```
* Tools like `jshint` can be used to track the errors in code in compile time.
* Node does not run out code directly, it wraps in a function. This is called Module Wrapper Function. It wraps out code like this
```
(function(exports, module,require, filename, dirname….){
  // our code goes here
})
```
To get the information about any file name and directory name of any module below code is used.
```
console.log(__filename);
console.log(__dirname);
```

* `EventEmitter` is one of the core classes in Node that allows us to raise (emit) and
handle events. Several built-in classes in Node derive from EventEmitter. 

 To create a class with the ability to raise events, we should extend EventEmitter:
```
class Logger extends EventEmitter {} 
```
We will see in detail below.
## Modules In NodeJS:- 
Node has a few built-in modules that enable us to work with the file system, path objects, network, operating system, etc.

#### Path Module:-
```
const path  = require('path');
var pathObj = path.parse('__filename')
console.log(pathObj);
O/P => { root: '', dir: '', base: '__filename', ext: '', name: '__filename' }
```

#### OS Module:-
```
const os= require('os');
console.log('Total memory is '+ os.totalmem());
console.log(`Free memory : ${os.freemem}`);
```

#### File System Module:-
```
const fs = require('fs');

// It gives all the files in the current folder but as synchronous
const files = fs.readdirSync('./')
console.log(files);

// It gives all the files in the current folder but as Asynchronous through callbacks
const files = fs.readdir('./', function(err, files){
    if(err) console.log('Error',err)
    else console.log('Result',files)
});

O/P:- Result [ 'app.js', 'logger.js' ]
```

#### Event Module:-
```
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Register listener
//emitter.on('MessageLogged',function(){  // Listen without data
emitter.on('MessageLogged',function(args){
console.log('Listener is listening',args);
});

// Raised an event
//emitter.emit('MessageLogged'); // Emit without data
emitter.emit('MessageLogged',{id : 1,url:'http'});
```
Note:- We raising a event we must need to listner it else it will throw error. Like in above code Register listener can't be written after Raised an event.
#### Arrow function
An arrow function is a type of syntex writting for more code elegent. For example..
```
emitter.on('MessageLogged',function(args){
	console.log('Listener is listening',args);
});
```
The above code can be written as below..
```
// Arrow function in ECMA 6
emitter.on('MessageLogged',(args) => {
    console.log('Listener is listening',args);
});
```

#### Communication between modules/Module dependencies:-
You can create a class in a module and export it and get it in another module to send and receive events.

From Module
```
const EventEmitter = require('events');
class Logger extends EventEmitter{
    log(message){
        console.log(message);

        // Raise and events
        this.emit('MessageLogged',{id : 1,url:'http'});
    }
}

module.exports = Logger; 
```

To Module
```
const Logger = require('./logger');
const loggerObj = new Logger();
loggerObj.on('MessageLogged', (args) => {
	console.log('Listener is listeningin app which is sent from logger module',args);
});

loggerObj.log("Message from app");
```

#### HTTP Module:-
```
const http = require('http');
const server  = http.createServer();
server.on('connection',(socket) => {
    console.log('New connectione established')
});
server.listen(3000);
console.log('Listening on port 3000..')
```

```
const server  = http.createServer((req, res) => {
    if(req.url === '/'){
        res.write('Hello response');
        res.end;
    }
    if(req.url === '/api/course'){
        res.write(JSON.stringify([1,2,2,4]));
        res.end;
    }
});
server.listen(3000);
console.log('Listening on port 3000..')
```
To test open the chrome browser and hit `http://localhost:3000/` to see the output.
## Node Package Manager (npm)

* Every Node application has a `package.json` file that includes metadata about the
application. This includes the name of the application, its version, dependencies,
etc.
* We use NPM to download and install 3rd-party packages from NPM registry:
* All the installed packages and their dependencies are stored under
`node_modules` folders. This folder should be excluded from the source control.
* Node packages follow semantic versioning: `major.minor.patch`
* To check npm installed and its version  
``` $npm -v ```
* When you install node then npm comes along with it and both versions could be different.
* If you want to install a specific version of npm you can do like this
```
$sudo npm i -g npm@<required_version>
$sudo npm i -g npm@5.5.1
```
* Before adding to any Node package we have to add the package.json is a must. Package.json includes the basic details of your project/app like dependencies.
To create package.json type 
```
$npm init  //it will ask many questions like below..
```
package name: (npm-demo) 

version: (1.0.0) 

description: 

entry point: (index.js)

test command: 

git repository: 

keywords: 

author: 

license: (ISC)

just keep pressing Enter....

There is faster way to create package.json type 
```
$npm init --yes
```
#### Adding a new package/dependency to nodejs project.
* To use the third party package like underscore. First install it then use it.
Description given here https://www.npmjs.com/package/underscore
```
$npm i underscore // to install the package.
```

After doing this in our package.json a new entry will get created like this..
```
"dependencies": {
   "underscore": "^1.10.2"
 }
```
We can use it like this..
```
var _ = require('underscore');
var result= _.contains([1,2,4],4);
console.log(result);
O/P :- ture
```

*  If you want to install mongoose, you can do like this - 
```
$npm i mongoose
```

If you install mongoose it comes to lots of other dependencies packages which also comes parallel to the mongoose package under node_modules. If a case of some package already installed with a different version (just supposed v1.0.0) then the new package with the same name (just supposed v12.0.0)  goes inside to that new package not parallel.
⇒ In case of node_modules gets deleted and your apps package.json has some dependencies, to install all the required dependencies just type `$npm i `

Or another case if you are trying to transfer your project to someone else then you don't need to give heavy node_modules folder, so just give your file and ask to hit  `$npm i `

It will install all the required dependencies mentioned in the package.json
* Let's suppose we don’t want to push node_modules to git, we want to ignore it then we need to create .gitignore file and just write node_modules/ inside the .gitignore file and save it it will not get committed and pushed to git.
* Semantic Versioning:- It has 3 parts. Example:- "mongoose": "^5.9.10"
^ -> Any version as long as the major verison is 5. New patches available then use that. 
 5 -> Major - for major changes, 9 -> Minor - for New features, 10 -> for bugs fixes and patch
To get the exact version remove the ^
E.g:- ^5.9.10 is same as 5.x

* Listing the installed packages:- It is very difficult to go and check each package to get their verison.  We can get a list by typing 
```
$npm list  // it will give you a detailed tree with dependencies. It will be all dependencies to each other. 
```

─┬ mongoose@5.9.19
│ ├── bson@1.1.4
│ ├── kareem@2.3.1
│ ├─┬ mongodb@3.5.9
│ │ ├─┬ bl@2.2.0
│ │ │ ├─┬ readable-stream@2.3.7
.
.
.
│ ├── sift@7.0.1
│ └── sliced@1.0.1
└── underscore@1.10.2

But if you want to know only your top level dependency then type  
```
$ npm list --depth=0
```
├── mongoose@5.9.19

└── underscore@1.10.2


### Viewing Registry info for a package:-
```
$npm view mongoose  		// Gives everything about mongoose package
$npm view mongoose dependencies // Gives all the dependencies of mongoose
$npm view  mongoose versions  	// Gives all the versions released by mongoose till date.
```

### Installing a specific version of a package:-
```
$npm i mongoose@2.4.2 	// Specifically 2.4.2 version of mongoose will be installed.
$npm outdated			// Tell what are lasted, current, wanted, location
```
And if you run `$npm outdated` if you see list of packages with versions and you want to update those then you can run $npm update	

If you want to update any package to Latest release the type
```
$sudo npm i -g npm-check-updates
$npm-check-updates
$ncu -u
$npm i
```

### DevDependencies (Development Dependencies):- 
There are some dependency needs which need for unit testing, code structure etc supporting dependencies which should not go to production, we can install it like this. Installing jshint. It will install and can be seen in the package.json file. It appears on the node_modules folder as dependency.
```
$npm i jshint --save-dev
```
After successful installation a separate object is created in package.json as devDependencies
```
"devDependencies": {
    "jshint": "^2.11.1"
  }
```


### Uninstalling a package:- 
```
$npm uninstall mongoose or $npm un mongoose
```
It will be removed from package.json and node_module as well.

⇒ Global Package:- npm, ng, you can run it from anywhere from any folder.
To install npm as a global 
```
$npm i -g npm // Install the latest version of npm Globally. 
```
If you want to check all the global outdated package you can run 
```
$npm -g outdated
```
If you want to uninstall the global package 
```
$npm un -g <packagename>
```

### Publishing a package:- 
To publish a package to npm we need to have an account. We can create, login like this..
```
$npm adduser
$npm login 		// Give username, password and email, then type
$npm publish
Once published we can install it using $npm i <packagename_published> and use it using require().
If you have done some changes and want to update the publish then type
$npm version major/minor/patch  // According to your changes
$npm publish
```
## Express

Express is the fast and lightweight framework for building web applications.

* RESTful APIs:- REST -> Representational State Transfer.
* Clients communicate to the Server using HTTP protocol where RESTful services are available to respond.

### Sending and receiving basic GET request:-
```
var express = require('express');
var app = express();

app.get('/',(req,res) => {
    res.send('Hello Word')
});
app.get('/api/courses',(req,res) => {
    res.send([1,2,3,4])
});
app.listen(3000, () => console.log('Listening to post 3000'));
O/P:- Check on chrome browser by http://localhost:3000/ or http://localhost:3000/api/courses
[1,2,3,4,]
```

### Installing Nodemon (Node monitor):- 
Let us suppose we are creating an api request in index.js and saving it and then going to the terminal and typing $node index.js again and again for changes. Nodemon packages can help with the same. After installing nodemon just run the index.js using $nodemon index.js once and whenever you do any changes and save it will automatically run.
* We use Nodemon to watch for changes in files and automatically restart the
node process.
* We can use environment variables to store various settings for an application. To
read an environment variable, we use process.env.
* You should never trust data sent by the client. Always validate! Use Joi package
to perform input validation.

* Environment variable:- hardcoded 3000 is not a safe idea, we need to get the port from process using process.env.PORT if it is not available use the default one like 3000. In case you want to set the POST use command `$export POST=5000` then run `nodemon index.js`
```
const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening to post ${port}...`));
```

### Route Parametres:- 
apis routing to different different request.like 
api/post/2020/10 // Here 2020 is year and 10 is the month.

```
app.get('/api/posts/:year/:month',(req,res) => {
    //res.send(req.params) // Route parameter
    res.send(req.query)    // Query parameter
    });

Hit below url on browser or postman to get the output
http://localhost:3000/api/posts/2020/10
http://localhost:3000/api/posts/2020/10?sortBy=name
```

### Handling HTTP GET request:- 
Create and array and based on query passed in URL return the result.
```
const courses = [
    {id: 1 , name : 'course1'},
    {id: 2 , name : 'course2'},
    {id: 3 , name : 'course3'}
];

app.get('/api/courses/:id',(req,res) => {
  // res.send(courses); // Return all the courses.
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course) res.status(404).send('The course given id was not found')
    res.send(course);
});
http://localhost:3000/api/courses/1
O/P:- {
id: 1,
name: "course1",
}
```

### Handling HTTP Post request:-
If you are trying to deal with post method request body and trying to read something from body then add this on top - to handle JSON pipelines in requests
```
app.use(express.json())

app.post('/api/courses', (req,res) => {

    const newcourse = {
        id : courses.length + 1,
        name : req.body.name
    }
    courses.push(newcourse);
    res.send(newcourse);
});
```
It gets the “name” from the body response and adds it to our course array and returns the new added object back as a response.

#### Input Validation:-
```
if(!req.body.name || req.body.name.length < 3){
        res.status(400).send('Name is required and with 3 char minium');
        return;
    }

Instead we validate input manually there is a package called joi. To install it $npm i joi
var Joi = require('joi');

const schema = {
        name : Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
```

### Handling HTTP PUT request:-
```
app.put('/api/courses/:id',(req,res) => {

    // Look for course
    // if not found return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course given id was not found')


    // If found validate
    // if invalid
    //consta result = validateCourse(req.body);
    const {error} = validateCourse(req.body);  // result.error

    // Object destruction feature in JS  
    if(error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // Update course
    // Return the updated course to the client.
    course.name = req.body.name;
    res.send(course)

});

function validateCourse(course){
    const schema = {
        name : Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}
```
### HTTP Delete request:-
```
app.delete('/api/courses/:id',(req,res) => {
    // Look up the course
    // Not existed 4040
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course given id was not found')

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index,1);

    //Return the deleted.
    res.send(course);
});
```

## Express Advance:-

### Middleware and custom Middleware:- 

A middleware function is a function that takes a request object and either
terminates the request/response cycle or passes control to another middleware
function.

Express has a few built-in middleware functions:
- json(): to parse the body of requests with a JSON payload
- urlencoded(): to parse the body of requests with URL-encoded payload
- static(): to serve static files
- You can create custom middleware for cross-cutting concerns, such as logging,
authentication, etc.

E.g: `app.use(express.json())` is middleware:- The job of the middleware function is to read the request and if there is any json object in the body of the request, it will parse the body of the request into a json object and then it will set `req.body` property.

The use of middleware to make a pipeline between the request and response. Let suppose after `app.use(express.json())` you want to do some logging then create a custom middleware for this job.

* Middleware functions are called in sequence.
* We can create a custom middleware in a separate file and use it in our file like below..
```
Logger.js
function log(req,res,next)  {
    console.log("Logging...");  // req.body
    next();
}

module.export = log;
```
```
Index.js
app.use(express.json())

// Custom middleware
app.use(logger);

// Custom middleware
app.use(function(req,res,next)  {
    console.log("Authenticating...");
    next();
});


O/P:- 
Logging...
Authenticating...
```

### Built-In Middleware:- 
```app.use(express.json())    → // set the req.body if json object is found in request body```

// url encoded format for POST req
```app.use(express.urlencoded({ extended: true})) // key=value&key=value   // req.body if json object ```

// static content can be served using this..
// Create a folder public and inside create a file readme.txt and put some content. If we hit http://localhost:3000/readme.txt on browser the content of the file will be shown on browser.
```app.use(express.static('public'))```

### Third-part Middleware:-
http://expressjs.com/en/resources/middleware.html
Middleware functions impact the application so use it carefully. It slows down the request processing. 

Some of the useful third party middleware is below..
https://github.com/helmetjs/helmet
http://expressjs.com/en/resources/middleware/morgan.html : - This makes debugging easier like if we use morgan we can see on the terminal what was requested, request type, status code, time taken to respond..
`GET /api/course    200 79 - 2.806 ms (morgan’s tiny format)`

### Environment:-
Sometimes we want to know that we are in development or production and based on the environment we use certain functionality to enable and disable it.
```
// Know your environment
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);  // If not set it will give you undefined
console.log(`app ENV: ${app.get('env')}`);   // If not set it will give you development

if(app.get('env') === 'development'){
    // Enable features here like logging etc etc..
    console.log(‘inside development');
}
```

You can set environment variable on Mac using ``` $export NODE_ENV  = production```

### Configuration:-
Storing configuration settings for the application and overriding those settings in each environment. Most populer is 
https://www.npmjs.com/package/rc
https://www.npmjs.com/package/config

You should not use app secret things like password or database key here in config file. Instead we should keep in the environment variables and read them using the config module. 
To create a config module install it using 
```npm i config 
const config = require('config');
```
Then create a config folder and inside it create a various configuration json file like default.json, development.json and production.json etc.. and use it in code like this
```
console.log('Application name: '+config.get('name')); // it will search for name key in json
console.log('Mail Server name: '+config.get('mail.host')); // it will search for host  key  in mail object in json
```
For secret use the the environment variable to set the password like this 
```$export app_password=1234```
And create a file under config folder with same name like this “custom-environment-variables.json” and define your json over there like this 
```
{
    "name" : "My express app development",
    "mail" : {
        "password" : "app_password"
    }
}
```
Use it in code as below..
```console.log('Mail Server name: '+config.get('mail.password')); // It checks for various config file for mail.password and get the value```

### Debugging:-
For extensive debugging use “debug”package by installing ```$npm I debug```
Add the debug module and Config the debug with tag as below..
```
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
To use it :-
if(app.get('env') === 'development'){
    startupDebugger('Debugger enabled');
}

dbDebugger('connecting to db');
To enable it, use the export option to do it..
$export DEBUG=app:startup // for app:startup logs only
$ export DEBUG= // To reset the above step
$ export DEBUG=app:startup,app:db. // for multiple logs
$ export DEBUG=app:* // for all logs

We can set the debug flag while starting our app like this
$ DEBUG=app:db nodemon index.js 
```

### Templating Engine:-
A json response is required to return to the client, sometimes a html markup so here the Templating Engine is required. Some of the popular ones are “Pug”, “Mustache” or “EJS”. 
/****** Templating engine ******/
// Loading a pug templating engine
```
app.set('view engine','pug');
app.set('views','./views'); // default
```

Create a folder in the root directory as a “views” and inside it create a file “index.pug” and add the following in it..
```
html
    head
        title= title
    body
        h1=message
 ```
// Send the html markup back as a response, here index is index.pug and title and message from above variable..
```
app.get('/', (req,res) => {
    res.render('index',{title:'my title',message:'my message'});
});
```
### Database Integration:- 
http://expressjs.com/en/guide/database-integration.html
* Cassandra
* Couchbase
* CouchDB
* LevelDB
* MySQL
* MongoDB
* Neo4j
* Oracle
* PostgreSQL
* Redis
* SQL Server
* SQLite
* Elasticsearch

### Authentication:-
The authentication is out of scope for Express. It can be achieved separately

### Structuring a express application:-
Create a folder like “routes” to routes all the requests like /api/courses etc..’
Create a file under routes like name courses.js or genera.js as per your requirement.
Export the express and use Router like below in file..
```
const express = require('express');
const router = express.Router();
To use it in the main index.js..
const courses = require('./routes/courses');
app.use('/api/courses',courses);  // here '/api/courses' is the routes..
```
Same for middleware, create a middleware folder and have all middleware in one file.

## Asynchronous JS:-
Asynchronous doesn’t mean the concurrency or multithread. It just means non-blocking.
```
console.log('Before');

// Asynchronous code
setTimeout(() => {
    console.log('Reading a user from a db');
}, 2000);

console.log('After');

O/P:-
Before
After
Reading a user from a db // got displayed on console after 2 sec
```

If you want to return a value from some Asynchronous operation then there are 3 methods for it.
* Callbacks
* Promises
* Async/await

### 1 Callbacks and its hell:-
```
// Synchronous
console.log('Before');
const user = getUser(1);
const repos = getRepositories(user.githubUsername);
const commits = getcommits(repo[0]);
console.log('After');
```

```
// Asynchronous
console.log('Before');

getUser(1, (user) => {
    console.log('User: ', user);

    // get the repositories
    getRepositories(user.githubUsername, (repos) => {
        console.log('Repos: ', repos);
    })
});

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a db');
        callback({ id: id, githubUsername: 'firozanwar' })

	getCommits(params);
    }, 2000);
}

function getRepositories(username, callback) {

    setTimeout(() => {
        console.log('Calling github api');
        callback(['repo1', 'rrpo2', 'repo3']);
    }, 2000);

}
console.log('After');
```

Conclusion: -Callback asynchronous is hell due to nesting.
Solution for nesting callbacks:-
We can create a name function and call it instead for callbacks. But this is a good solution and just a work sound.


### 2 Promises
It means it holds the asynchronous operation. Promises means it will give you some result completed or error/failed.

```
const  p = new Promise((resolve, reject) => {

    // Async task here
    setTimeout(() => {
        //resolve(1);  // Success of fullfilled
        reject(new Error('message'));   // pending -> failed
    }, 2000);
    
    
});

p.then(result => console.log('Result',result))
.catch(err => console.log('Error: ',err.message));
```

Code Snippets:-
```
// Asynchronous code
// const p  = getUser(1);
// p.then(user => console.log(user));

//or
getUser(1)
.then(user => getRepositories(user.githubUsername))
.then(repos => getCommits(repos[0]))
.then(commits => console.log('Commits: ',commits))
.catch(err => console.log('Error: ',err.message));  // thrown if anything goes wrong

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a db');
            resolve({ id: id, githubUsername: 'firozanwar' });
        }, 2000);
    });
}

function getRepositories(username) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling github api');
            resolve(['repo1', 'rrpo2', 'repo3']);
        }, 2000);
    });
}

function getCommits(repo){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling github api for commits');
            resolve(['commit1', 'commit2', 'commit']);
        }, 2000);
    });
}
```

Note:- If you need to resolve Promises at runtime like in unit tests or something we can do this by following..
```
const  p = Promise.resolve({id: 1});
p.then(result => console.log(result));

const  p1 = Promise.reject(new Error('rejected reason'));
p.catch(error => console.log(error));
```

#### Parallel Promises:-
Case 1: If you want multiple promises to run and on end display some result then use as below..
Create a promise p1 with resolve(1)
Create a promise p2 with resolve(2)

And do 
```
Promise.all([p1,p2])
	.then(result => console.log(result))
	.catch(err => console.log(err));
O/P:- [1,2]
```
Case 2:  If you want multiple promises to run and don't want to wait for entire all to finish then use 
```
Promise.race(p1,p2])
.then(result => console.log(result))
	.catch(err => console.log(err));
O/P:-1   // Value of 1st fulfil promise
```

### 3 AsyncAwait
AsyncAwait uses internally promises only. AsyncAwait is just a type s syntactical representation. It looks synchronous but works as asynchronous. Using a asyncawait you need to wrap your code in try catch block to catch error.
// Async and await with approach.
```
async function displayCommits(){
    try{
        const user = await getUser(1);
        const repos = await getRepositories(user.githubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }catch(err){
        console.log('error occured');
    }
   
}

displayCommits();
```
## MongoDB:-
https://www.mongodb.com/
Mongodb can be installed using brew on mac using below command
```
brew install mongodb
```
But it will throw an error because it has been removed from homebrew. Check here
https://stackoverflow.com/questions/57856809/installing-mongodb-with-homebrew
* It stores the data in the data/db directory in the system.
* Install the mongodb client app from and do connect https://www.mongodb.com/try/download/compass
* Like in relational database we have Tables and rows, here in MongoDB we have Collections and documents.
* Mongoose defined schema for data.

### Creating a documents in mongoDB using mongoose
```
const mangoose = require('mongoose');
```
```
mangoose.connect('mongodb://localhost/playground')
.then( () => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDb..',err));

const courseSchema = new mangoose.Schema({
    name : String,
    author : String,
    tags : [String],
    data: {type: Date, default: Date.now},
    isPublished : Boolean
});

// Compile the above schema into a model class
const Course = mangoose.model('Course',courseSchema);

async function createCourse(){
// Create a object of model and initialize with document to map it.
const course = new Course({
    name: "Node.js course",
    author: "Firoz",
    tags: ['Angular','frontend'],
    isPublished: true
});

// Save th data into MongoDB.
const result  = await course.save();
console.log(result);
}

createCourse();
```

* Open the MongoDB compass and refresh it. Data will be as below..
```
_id:5ef1d061ab04d204397f157e
tags:Array
data:2020-06-23T09:50:25.676+00:00
name:"Node.js course"
author:"Firoz"
isPublished:true
__v:0
```
 
### Query Database:- 
```
async function getCourses(){
 
    // All the document
    const courses = await Course.find();
    console.log(courses);
 
    // Specifc data
    const coursesSpecifc = await Course.find({author: 'Firoz', isPublished: true});
    console.log(coursesSpecifc);
 
    const coursesFilter = await Course
    .find({author: 'Firoz', isPublished: true})  // Filter the documents
    .limit(10)   // No. of documents
    .sort({name: -1})   // 1 for asending, -1 for descending 
    .select({name: 1,tags:1});   // only show slected propertiy only.
    console.log(coursesFilter);
}
```
 
### Filtering documents / Comparison query operator in mongoDB:- 
* eq  (equal)
* ne (not equla)
* gt (greater tha)
* gte (greater than or equal to)
* lt (less than)
* in ()
* nin (not in)
 
Example 1: price greater than 10
```
.find({price: {$gt: 10} })  // Filter the documents
```
 
Example 2: Greater than 10 and less than or equal to 20
```
.find({price: {$gt: 10, $lte:20} })
```
 
Example 2: Price where it is 10, 15 and 20.
```
.find({price: {$in: [10,15,20]}})
```
 
### Logical query operator:-
* or
* and
 ```
.or([{author: 'Firoz'}, {isPublished: true}])
.and[{author: 'Firoz'}, {isPublished: true}]
  ```
 
### Regular Expression:-
```
.find({author: /pattern/})
```
 
Example: Author start with Firoz
```
.find({author: /^Firoz/})
 
    // End with Anwar
    .find({author: /Anwar$/})
 ```
 
Note:- The above query is case sensitive. If you want to make query insensitive then append /I at last
```
.find({author: /Anwar$/i})
```
 
Example: If you want to search for a string-like contains method then you can use it like this..
// Contain Firoz  (it could be in starting, middle to end anywhere)
```
find({author: /.*Firoz.*/})
```
 
### Counting:-
```
.find({author: 'Firoz'}, {isPublished: true})
 .count();
  console.log(coursesFilter);
 
O/P: -1  (one record found)
 ```
 
### Paging:-
```
const pageNumber = 2;
const pageSize = 10;
 // api/course?pageNumber=2&pageSize=10
 
.find({author: 'Firoz', isPublished: true})  
.skip((pageNumber -1) * pageSize)
```
 
#### Exercise #1
```
const mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDb..', err));
 
// Create a schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
});
 
// Create a model from schema
// Compile the above schema into a model class
const Course = mongoose.model('Course', courseSchema);
 
async function getCourses() {
 
    // const courses = await Course.find();
    // console.log(courses);
 
    return await Course
        .find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });
 
        return courses;
}
 
async function run() {
    const coursesarray = await getCourses();
    console.log(coursesarray);
}
 
run();
 ```
 
#### Exercise #2
```
return await Course
        .find({ isPublished: true, tags: {$in: ['frontend','backend']} })
        .sort( '-price')    // -1 for desending order
        .select('name author price');
 
// or
.find({ isPublished: true})
        .or([{tags: 'frontend'}, {tags: 'backend'}])
        .sort( '-price')    // -1 for desending order
        .select('name author price');
```
 
#### Exercise #3
```
return await Course
        .find({ isPublished: true})
        .or([
            {price: {$gte: 15}}, 
        {name: /.*by*./i}])
        .sort( '-price')    // -1 for desending order
        .select('name author price');
 ```
 
### Updating Documents - Query First
There is 2 approach:- 
#### Approach #1:-
// Query first
        // findById
        // Modify its properties
        // save
 
// Apprach 1.a
```
        course.isPublished = true;
        course.author = 'Author Author';
    
        // or Apprach 1. b
        // course.set({
        //     isPublished: true,
        //     author: 'Author Author Author'
        // });
    
        const result  = await course.save();
        console.log(result);
 ```
#### Approach #2:-
```
// Update first
        // Update directly
        // Optionally: get the updated document
 
const result  = await Course.update({_id: id}, {
            $set:{
                author: 'Mosh',
                isPublished: false
            }
        });
 ```
There is another method findByIdAndUpdate etc etc...
 
Note:- If you want to get the updated data back then pass last object as a {new: true}
 
### Remove document:-
```
const result = await Course.deleteOne({ _id: id });
const result = await Course.deleteMany({ _id: id });
const course = await Course.findByIdAndRemove(id);
 
async function removeDoc(id){
        const result = await Course.deleteOne({_id: id});
        console.log(result);
        //Course.deleteMany({isPublished: false});
    }
``` 
 
### Mongoose Data Validattor:-
Data validation is required when we need a specific type of data like name should be String. Example if you define a name of type string and don’t pass that parameter it will show you the error.
For data validation define like this
name : {type: String, required: true},
Data validation of any parameter could be 3 types. 1. Pending 2. Fulfilled 3. Rejected.
 
Solution:-
```
try {
// await course.validate();
    const result  = await course.save();
console.log(result);
} catch (error) {
    console.log(error.message);
}
 
O/P:-
course validation failed: name: Path `name` is required.
```
 
### Built-In validator in mongoose:-
→ required(): Let is suppose when published is true then only you want the price.
 ```
price: {
        type: Number,
        required: function () { return this.isPublished; }
    }
 ```
—> minlength, maxlength and enum validator for String
```
name: { type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 255,
         }
 
category: {
             type: String,
             required: true,
             enum: ['web','mobile']
         }
```
```
—> min: max: for Number
 ```
### Custom Validator:-
If you want to implement your own logic, At Least should have at least one tag like below..
```
tags: {
        type: Array,
        validate: {
            validator: function(v){
                Return v &&  v.length
            },
            message: 'A course should have at least one tag'
        }
    }
 ```
### Async Validator:-
```
tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v,callback) {
                setTimeout(() => {
                    return v && v.length
                }, 1000);
            },
            message: 'A course should have atleast one tag'
        }
    }
```
