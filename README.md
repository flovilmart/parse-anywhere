parse-develop
=========

Develop your parse powered webapps locally

##Installation

Install globally for availabilty system wide

#####With npm
	
	npm install parse-develop -g

#####From source:

clone the repo in your favorite place:

	git clone git://github.com/flovilmart/parse-develop.git
	cd parse-develop
	npm install -g
	
That will install the local parse environment wrapper in the parse-develop directory

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

and you're done!


###Limitations:
As you know, Parse provide hooks (beforeSave, afterSave, beforeDelete, afterDelete) and define functions. 

Those functions have to be uploaded to the Parse servers using `parse deploy` or `parse develop`. 

Updating those functions locally without publishing your code to parse have no effect!



##How to use

From your parse cloud app folder, 
instead of running `parse develop [app name]`, your can now run `parse-develop [app name]` or `parsedev [app name]`

app name is optional

Happy parsing!

##Supported parse-provided cloud modules 
 
- applinks
- mailgun
- mandrill
- sendgrid
- stripe
- parse-image
- twilio


##Custom Configuration


Overriding the default configuration is at your own risks and may render your installation unstable, please use with care!


It is possible to change the behavior of forever monitor through a rc file (we use the rc module).

The appname for rc is `parsedev`

Visit [RC Standards](https://github.com/dominictarr/rc#standards) for more informations

All parameters of forever-monitor are available for configuration but some are automatically overriden (otherwise the whole app doesn't work)

The parameters from forever-monitor that can't be changed are:

`options, env, sourceDir, watchDirectory`

Even if `watchDirectory` can't be overriden, you can disable `watch` by setting `watch=false`

If you set `debug=1`, that will override the command parameter to `node --debug`, it has the same effect as `command="node --debug"`

The default options for are:

	{
		// Forever monitor options
    	max: 1,
    	command: "node",
    	spawnWith: {
     		customFds: [-1, -1, -1], // that forever spawns.
      		setsid: false
    	},
    	watch:true,
    	minUptime: 1000,
    	spinSleepTime: 500,
    	
    	// expressjs port
    	port: 3000
  	}

##Change Log

#####0.0.50
Adds support for all Parse Cloud modules provided by parse

Base modules

- [express (custom version)](https://github.com/flovilmart/express/tree/3.1.0-parse)
- ejs
- moment
- buffer
- http
- jade
- underscore

Custom Cloud modules

- applinks
- mailgun
- mandrill
- sendgrid
- stripe
- parse-image
- twilio

Removes necessity to pass a port to `app.listen`

Removes necessity to add your public cloud directory


#####0.0.32

Adds mailgun and mandrill cloud modules

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

