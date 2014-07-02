var getKeys = function(config, appName){
    if (appName === "_default" || appName === undefined || appName === "undefined") {
        if (appName !== "_default") {
            console.info("No app name provided... Will load _default");
        }
        appName = "_default";
        //console.log("");
        return getKeys(config, config.applications[appName].link);
    }
    console.info("Trying configuration for "+appName);
    var keys = config.applications[appName];
    var err;
    if (!keys) {
        err =  'Unable to find application:'+appName
    }else if(!keys.javascriptKey){
        err = "Add your javascriptKey in config/global.json for the app:"+appName
    }
    if (err) {
        console.error(err);
        return;
    }
    return keys;
}

module.exports.getConfiguration = function(appPath, appName){

    var path = require("path");

    var configPath = path.resolve(appPath,"config","global.json");

    var config = require(configPath);
    return getKeys(config, appName);
}
