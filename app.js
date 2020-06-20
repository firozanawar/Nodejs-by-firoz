const logger = require('./logger.js')
logger.logfunction("Firoz Anwar")



function sayHello(name){
    console.log("Hello " + name)
}

sayHello("Firoz");

/****** Global object *******/
// In the Node varibale are not part of global scope. It is part of the current file/module only.
var message = "Hi"
console.log(global.message);  // It 'll throw undefined error.

// Current file/module information.
//console.log(module);