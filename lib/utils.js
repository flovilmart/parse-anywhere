var getKeys = function(config, appName, configPath){
    if (appName === "_default" || appName === undefined || appName === "undefined") {
        if (appName !== "_default") {
            console.info("No app name provided... Will load _default");
        }
        appName = "_default";
        //console.log("");
        return getKeys(config, config.applications[appName].link, configPath);
    }
    console.info("Trying configuration for "+appName);
    var keys = config.applications[appName];
    var err;
    if (!keys) {
        err =  'Unable to find application:'+appName
    }
    if (err) {
        console.error(err);
        return;
    }
    return keys;
}

module.exports.getConfiguration = function(appPath, appName){
    var fs = require('fs')
    var path = require("path");

    var configPath = path.resolve(appPath, ".parse.local");
    var config;
    if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    }else{
        configPath = path.resolve(appPath,"config","global.json");
        config = require(configPath);
    }
    return getKeys(config, appName, configPath);
}
