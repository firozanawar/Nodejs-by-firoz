var url = "http://logger.io/log"

function log(messgae){

    // Sent http request
    console.log(messgae);
}

// Export as an object
 module.exports.logfunction = log;

 // Export as an single fuction
 module.exports = log;