

Parse = require("parse-cloud-additions").Parse;

global.Parse = Parse;

var appName = process.argv[3];
if (appName && appName !== "undefined") {
    console.log("Starting app "+appName);
}

var start = function(config){
    console.log("[%s] Running...", process.pid);
    Parse.initialize(config.applicationId,config.javascriptKey,config.masterKey);
    require("cloud/main");
}
// 4 is the stringified config file, passed from previous script...
if (process.argv[4]) {
    start(JSON.parse(process.argv[4]));
}else{
    var path = process.argv[2];
    require("./lib/utils").getConfiguration(path, appName, function(err, config){
        if (err) {
            return console.error(err);
        }else{
            start(config);
        }
    });
}





