var getKeys = function(config, appName, callback){
    if (appName === "_default" || appName === undefined || appName === "undefined") {
        if (appName !== "_default") {
            console.log("No app name provided... Will load _default");
        }
        appName = "_default";
        //console.log("");
        return getKeys(config, config.applications[appName].link, callback);
    }
    console.log("Trying configuration for "+appName);
    var keys = config.applications[appName];
    if (!keys) {
        callback('Unable to find application:'+appName);
    }else if(!keys.javascriptKey){
        callback("Add your javascriptKey in config/global.json for the app:"+appName); 
    }else{
        console.log("Loading configuration for "+appName);
        callback(null, keys);
    }
}

module.exports.getConfiguration = function(appPath, appName, callback){

    var fs = require('fs');
    var path = require("path");

    appPath = path.resolve(appPath,"config","global.json");

    fs.readFile(appPath, 'utf8', function (err,data) {
        if (err) {
            callback("Can't find config/global.json");
            return;
        }
        var config = JSON.parse(data);
        getKeys(config, appName, function(err, keys){
            if(err){
                callback(err);
            }else{
            	callback(null, keys);
            }
        });
    });
}