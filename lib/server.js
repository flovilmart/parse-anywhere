/*jshint node:true */

// Load Parse
var Parse = require("parse-cloud").Parse;
global.Parse = Parse;

var appName = process.argv[3];
if (appName && appName !== "undefined") {
    console.log("Starting app "+appName);
}

var start = function(config) {
    'use strict';
    process.chdir(process.env.PARSEDEV_APP_PATH);
    console.log("[%s] Running on http://localhost:%s/", process.pid,
process.env.PARSEDEV_PORT);
    Parse.initialize(config.applicationId, process.env.PARSE_JAVASCRIPT_KEY, process.env.PARSE_MASTER_KEY);

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
