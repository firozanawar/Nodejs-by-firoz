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


