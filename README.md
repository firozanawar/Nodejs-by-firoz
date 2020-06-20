# Node.js

### Introduction:-
Creator of Node is Ryan Dahl . Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node JS is a runtime environment for executing JavaScript code.  It is used for Backend Services like API (Application Programming Interface). It is used to build Highly scalable, data intensive and real time apps. Node is something which can be run outside of Browser using Chrome’s V8 engine. NodeJS is used where capability is not available in browsers like FileSystem or network etc. Node is not a programming language or framework, it is a runtime environment for executing JavaScript code.
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

![NodeApp](https://user-images.githubusercontent.com/15997473/85196481-18725100-b2f8-11ea-8974-3c30c0cea0c3.png)

![NodeApp2](https://user-images.githubusercontent.com/15997473/85196485-2627d680-b2f8-11ea-97fe-fd06a90b0a87.png)

![NodeApp3](https://user-images.githubusercontent.com/15997473/85196487-2922c700-b2f8-11ea-82ec-b706ef91b0c4.png)

### Miscellaneous:-
* To check Node is installed in your computer type in terminal $node --version
* To run a Node JS code. Just run $node app.js
* Global Scope object in Javascript
```
	Console.log, setTimeout(), clearTimeout(), setInterval, clearInterval(), window etc
```
* In javascript we can call everything using the window. Like `window.console.log` but since there is no window in Node, there is something called global. We can use global here to access anything like..
`global.console.log, global.setTimeout...`
If you define a variable and access it using a global it will throw as “undefined” because it belongs to the current file only.
* Every file in Node is considered as a Module. All the variables and functions are defined to that file as scope to that module/file only (like private).
To know the current module just type `console.log(module)`
* One module can be export its functionality like variable or methods using `module.exports.anyNameHere = <export-items>`
And another module can get it using require like this
`Const logger = require(./logger.js)`
But using the above we are creating a whole object to access it, if we have only one function to export then no need to export a full object just do like this.
`Module.exports  = <export-items>`
`Const log = require(./logger.js)  // here now log is just the function not object.`
`log(‘message’);`
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

* EventEmitter is one of the core classes in Node that allows us to raise (emit) and
handle events. Several built-in classes in Node derive from EventEmitter.
 To create a class with the ability to raise events, we should extend EventEmitter:
```class Logger extends EventEmitter {} ```

### Modules In NodeJS:- 
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

#### Arrow function
```
// Arrow function in ECMA 6
emitter.on('MessageLogged',(args) => {
    console.log('Listener is listening',args);
});
```

* You can create a class in a module and export it and get it in another module to send and receive events.

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
### Node Package Manager (npm)

* Every Node application has a package.json file that includes metadata about the
application. This includes the name of the application, its version, dependencies,
etc.
* We use NPM to download and install 3rd-party packages from NPM registry:
* All the installed packages and their dependencies are stored under
`node_modules` folders. This folder should be excluded from the source control.
* Node packages follow semantic versioning: major.minor.patch
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
just keep pressing Enter.
There is faster way to create package.json type 
```
$npm init --yes
```
* To use the third party package like underscore. First install it then use it.
Description given here https://www.npmjs.com/package/underscore
```
npm i underscore // to install the package.
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

*  Install mongoose - `npm i mongoose`

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
$npm view mongoose  	// Gives everything about mongoose package
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
```$npm i -g npm // Install the latest version of npm Globally. ```
If you want to check all the global outdated package you can run ```$npm -g outdated```
If you want to uninstall the global package ```$npm un -g <packagename>```

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

