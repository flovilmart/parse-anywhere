XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
Buffer = require("buffer").Buffer;
Parse = require("parse").Parse;
_ = Parse._;
Parse.Cloud = {};
Parse.Cloud.job = Parse.Cloud.define = Parse.Cloud.beforeSave =
Parse.Cloud.afterSave = Parse.Cloud.beforeDelete = Parse.Cloud.afterDelete = function(){};

Parse.Cloud.httpRequest = require("./httpRequest");

Parse.Cloud._expressCookieEncryptionKey = function(){
	return "This is a super secure encryption key";
}

Parse.User.prototype.getSessionToken = function(){
    return this._sessionToken;
}

global.Parse = Parse
var appName = process.argv[3];
if (appName) {
    console.log("Starting app "+appName);
}
var path = process.argv[2];
fs = require('fs');
fs.readFile(path+"config/global.json", 'utf8', function (err,data) {
  if (err) {
    throw "Can't find config/global.json"
    return console.log(err);
  }
 	var config = JSON.parse(data);
    var keys = config.applications[appName];
    if(typeof keys == "undefined"){
        console.log("Can't find "+appName+"\n trying default");
        appName = "_default";
        appName = config.applications[appName].link;
    }
 	var keys = config.applications[appName];
    if(!keys.javascriptKey){
        throw "Add your javascriptKey in config/global.json"
    }
 	Parse.initialize(keys.applicationId,keys.javascriptKey,keys.masterKey);
	require("cloud/main");
});


