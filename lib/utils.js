var getKeys = function(config, appName, callback){
    if (appName === "_default" || appName === undefined || appName === "undefined") {
        appName = "_default";
        console.log("Default App!");
        return getKeys(config, config.applications[appName].link, callback);
    }
    console.log("Loading configuration for "+appName);
    var keys = config.applications[appName];
    if (!keys) {
        callback('Unable to find application:'+appName);
    }else if(!keys.javascriptKey){
        callback("Add your javascriptKey in config/global.json for the app:"+appName); 
    }else{
        callback(null, keys);
    }
}

module.exports.getConfiguration = function(path, appName, callback){
    fs = require('fs');
    fs.readFile(path+"config/global.json", 'utf8', function (err,data) {
        if (err) {
            callback("Can't find config/global.json");
            return;
        }
        var config = JSON.parse(data);
        getKeys(config, appName, function(err, keys){
            if(err){
                callback(err);
                return;
            }else{
            	callback(null, keys);
                //console.log("Started!");
                //Parse.initialize(keys.applicationId,keys.javascriptKey,keys.masterKey);
                //require("cloud/main");
            }
        });
    });
}