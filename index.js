Parse = require("parse").Parse;
Parse.Cloud = {};
Parse.Cloud.job = Parse.Cloud.define = Parse.Cloud.beforeSave =
Parse.Cloud.afterSave = Parse.Cloud.beforeDelete = Parse.Cloud.afterDelete = function(){};
Parse.Cloud.httpRequest = require("./lib/httpRequest");
Parse.Cloud._expressCookieEncryptionKey = function(){
	return "This is a super secure encryption key";
}
Parse.User.prototype.getSessionToken = function(){
    return this._sessionToken;
}

global.Parse = Parse

var appName = process.argv[3];
if (appName && appName !== "undefined") {
    console.log("Starting app "+appName);
}

var start = function(config){
    console.log("["+process.pid+"] Running...");
    Parse.initialize(config.applicationId,config.javascriptKey,config.masterKey);
    require("cloud/main.js");
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





