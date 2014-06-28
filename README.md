parse-develop
=========

A local parse environment 
That enables using the expressjs module of parse on your local machine, so you don't need to push the code each time you iterate!

###What it does?

Loads your cloud code modules with forever and start it!
Supports Parse.Cloud.httpRequest
Ignores all other Parse.Cloud functions

###Limitations:
- Doesn't push your cloud functions, beforeSave, afterSave, beforeDelete, afterDelete etc...
- A few changes are required in your code, don't worry, nothing that breaks anything


##Prepare your project:

in you config/global.json

add your javascriptKey:

	{
		"applications":{
			"myApp": {
				"applicationId": "MYAPP_ID",
				"masterKey" : "MY_MASTER_KEY",
				"javascriptKey": "SET YOUR JS KEY HERE!"
			}
		} 
	}

Where you call `app.listen()`

	// Setup the public folder for your static files
	try{
		app.use(express.static(__dirname + '/../public'));
	}catch(e){
	
	}
	// Set the port to 3000 or whatever you like
	// It has no effect in production on Parse servers
	app.listen(3000);


and you're done!

###Installation

Install globally for availabilty system wide

#####With npm
	
	npm install parse-develop -g

#####From source:

clone the repo in your favorite place:

	git clone git://github.com/flovilmart/parse-develop.git
	cd parse-develop
	npm install -g
	
That will install the local parse environment wrapper in the parse-develop directory

How to use
======

#### In your parse app folder

instead of running `parse develop [app name]`, your can now run `parse-develop [app name]` or `parsedev [app name]`

app name is optional


####For non global installations, in your cloned directory

`./parse-develop path-to-your-parse-app [app name]`

where path-to-your-parse-app is the full path to your parse app root folder with
a trailing / and app name is an optional application name in your global/config.json file

Happy parsing!

Custom Configuration
==========

Overriding the default configuration is at your own risks and may render your installation unstable, please use with care!

It is possible to change the behavior of forever monitor through a rc file (we use the rc module).

The appname for rc is `parsedev`

Visit [RC Standards](https://github.com/dominictarr/rc#standards) for more informations

All parameters of forever-monitor are available for configuration but some are automatically overriden (otherwise the whole app doesn't work)

The parameters from forever-monitor that can't be changed are:

`options, env, sourceDir, watchDirectory`

Even if `watchDirectory` can't be overriden, you can disable `watch` by setting `watch=false`

If you set `debug=1`, that will override the command parameter to `node --debug`, it has the same effect as `command="node --debug"`

The default options for forever-monitor are:

	{
    	max: 1,
    	command: "node",
    	spawnWith: {
     		customFds: [-1, -1, -1], // that forever spawns.
      		setsid: false
    	},
    	watch:true,
    	minUptime: 1000,
    	spinSleepTime: 500,
  	}

Change Log
=========
#####0.0.31

Adds applinks-metatag module for [AppLinks](https://www.parse.com/docs/cloud_modules_guide#applinks)

Use require for synchronous configuration reading


#####0.0.30

Changes to forever-monitor (recommended behavior)
Adds parsedev command (for simplicity sake)
Adds configuration for forever-monitor with rc (appname is parsedev)


#####0.0.20
Add Windows Support!

Fixes crazy restart loops when addr in use

Improves overall performance


#####0.0.15
Removes dependency on parse

Adds dependency on parse-cloud-additions

Improves path handling for non *NIX machines

#####0.0.13
Adds prefer global directive

Removes unused code


#####0.0.12
Reverts parse-stripe dependency to full git url

Adds which as a dependency for forever full path


#####0.0.11
Set the DEBUG environment variable to start the process node --debug so you can
use node-inspector or any other debugger!

Displays the PID upon launch


#####0.0.10
Improves forever restarting craziness

Adds sanity check of the configuration file before starting forever

Improves reliability

!! Don't seem to be able to find the views when launched outside of the parse
folder


#####0.0.9:
Adds npm for all parse-* modules instead of git

Moves stripe-node fork to flovilmart/parse-stripe

#####0.0.8:
Adds npm for parse-image instead of git

#####0.0.5:
Changes for NPM to parse-develop

#####0.0.4:
Adds support for parse-image

#####0.0.2:

Ability to install system wide

#####0.0.1:

Proof of concept

