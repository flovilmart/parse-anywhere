/*jshint node:true */

// Load Parse
global.Parse = require("parse-cloud").Parse;

var appName = process.argv[3];
if (appName && appName !== "undefined") {
    console.log("Starting app "+appName);
}

var start = function(config) {
    'use strict';
    process.chdir(process.env.PARSEDEV_APP_PATH);

    var app = require("express")();
    console.log("[%s] Running on http://localhost:%s/", process.pid, process.env.PARSEDEV_PORT);
    Parse.initialize(config.applicationId, config.javascriptKey, config.masterKey);
    require("cloud/main");
};

// 4 is the stringified config file, passed from previous script (i.e. parse-develop)
if (process.argv[4]) {
    start(JSON.parse(process.argv[4]));
} else {
    var path = process.argv[2];
    var keys = require("./utils").getConfiguration(path, appName);
    if(!keys){
        system.exit(1);
    }
    start(keys);
}
