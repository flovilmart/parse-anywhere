var path = require("path");
var forever = require('forever-monitor');
var rc = require("rc");
var _ = require("underscore");

module.exports = exports = ParseServer = function(appName, baseDir){
	var options = {};
	options.app = appName;
	options.path = path.resolve("./");
	if (baseDir) {
		console.log("Using directory "+baseDir);
		options.path = path.resolve(baseDir);
	};

	this.options = options;
}

ParseServer.prototype.load = function() {

	var options = this.options;

	var sourceDir = __dirname;
	var modulesPath = path.join(__dirname, "../","node_modules");

	if (process.platform === "win32") {
	    // Windows retains the S**T paths...
	    modulesPath = path.relative(process.cwd(), modulesPath);
	    sourceDir = path.relative(process.cwd(), sourceDir);
	}

	var env = _.clone(process.env);
	// Node environment
	env.NODE_PATH= [__dirname, options.path, modulesPath, process.env.NODE_PATH].join(path.delimiter);
	env.PARSEDEV_APP_PATH = options.path;
	
	// Silent connect deprecations
	env.NODE_ENV = env.NODE_ENV || 'test';

	var foreverConf = rc("parse-anywhere", {
	    command: "node",
	    spawnWith: {
	      setsid: false
	    },
	    watch:true,
	    minUptime: 1000,
	    spinSleepTime: 500,
	    port: env.PORT || 8080
	  });
    
	env.PARSEDEV_PORT = foreverConf.port;

	var appKeys = require("./utils").getConfiguration(options.path, options.app);
    if(!appKeys){
        process.exit(1);
    }
	'use strict';

	if (foreverConf.debug) {
	    foreverConf.command = "node --debug";
	}

	// Override the defaults
	foreverConf.env = env;
	foreverConf.options = [options.path, options.app, JSON.stringify(appKeys)];
	foreverConf.sourceDir = sourceDir;

	// Watch the path...
	if (foreverConf.watch) {
	    console.info("Watching "+options.path);
	    foreverConf.watchDirectory = options.path;
	}else{
	    console.info("Not watching...");
	}

	this.conf = foreverConf;
	return foreverConf;
}

ParseServer.prototype.start = function() {

	this.load();

	var child = new (forever.Monitor)("./server.js", this.conf);

	child.on('watch:restart', function(info) {
	    console.error('Restaring script because ' + info.file + ' changed');
	});
	
	child.on('restart', function() {
	    console.error('Forever restarting script for ' + child.times + ' time');
	});

	child.on('exit:code', function(code) {
	    console.error('Forever detected script exited with code ' + code);
	});

	// Start!
	child.start();

	return child;
}
