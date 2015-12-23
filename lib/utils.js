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
var getFromEnvironment = function() {
    var appId = process.env.PARSE_APPLICATION_ID;
    var jsKey = process.env.PARSE_JAVASCRIPT_KEY;
    var masterKey = process.env.PARSE_MASTER_KEY;

    if (appId && jsKey && masterKey) {
        console.log("Found parse keys in environment variables...")
        return {
            applicationId: appId,
            javascriptKey: jsKey,
            masterKey: masterKey
        }
    }
    return;
}

module.exports.getConfiguration = function(appPath, appName){
    var fs = require('fs')
    var path = require("path");

    var configPath = path.resolve(appPath, ".parse.local");
    var config = getFromEnvironment();
    if (config) {
        return config;
    };
    if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    }else{
        configPath = path.resolve(appPath,"config","global.json");
        config = require(configPath);
    }
    return getKeys(config, appName, configPath);
}
