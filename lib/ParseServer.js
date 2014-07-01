var path = require("path");
var forever = require('forever-monitor');
var rc = require("rc");

module.exports = exports = Environment = function(appName){
	var options = {};
	options.app = appName;
	options.path = path.resolve("./");

	var sourceDir = __dirname;
	var modulesPath = path.join(__dirname, "../","node_modules");

	if (process.platform === "win32") {
	    // Windows retains the S**T paths...
	    modulesPath = path.relative(process.cwd(), modulesPath);
	    sourceDir = path.relative(process.cwd(), sourceDir);
	}

	// Node environment
	process.env.NODE_PATH= [__dirname, options.path, modulesPath, process.env.NODE_PATH].join(path.delimiter);
	process.env.PARSEDEV_APP_PATH = options.path;
	// Silent connect deprecations
	process.env.NODE_ENV = process.env.NODE_ENV || 'test';

	var foreverConf = rc("parsedev", {
	    max: 1,
	    command: "node",
	    spawnWith: {
	      customFds: [-1, -1, -1], // that forever spawns.
	      setsid: false
	    },
	    watch:true,
	    watchDirectory: options.path,
	    minUptime: 1000,
	    spinSleepTime: 500,
	    port: 3000
	  });
	process.env.PARSEDEV_PORT = foreverConf.port;

	var appKeys = require("./utils").getConfiguration(options.path, options.app);
	'use strict';

	if (foreverConf.debug) {
	    foreverConf.command = "node --debug";
	}

	// Override the defaults
	foreverConf.env = process.env;
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
}

Environment.prototype.start = function(){
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
}




