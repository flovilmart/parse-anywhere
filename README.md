parse-anywhere
=========

formerly [parse-develop](https://github.com/flovilmart/parse-develop)

Run your parse powered webapps anywhere

## What does it do

It create and managed a wrapped environment in node.js in order to emulate the cloud/ dependencies. You can now run all your parse code on any server.

It leverages [forever-monitor](https://npmjs.com/packages/forever-monitor) to spawn a child process and have a clean environment there.


## Installation

#### To run on a cloud service


	npm install --save parse-anywhere
	
in your `package.json` replace the npm start script:

```
{
	...
	"scripts": {
		"start": "parse-anywhere"
	}
	...
}
```



#### With npm
	
	npm install parse-anywhere -g

#### From source:

clone the repo in your favorite place:

	git clone git://github.com/flovilmart/parse-anywhere.git
	cd parse-anywhere
	npm install -g
	
That will install the local parse environment wrapper in the parse-develop directory

##Prepare your configuration:

Two options are possible in order to run it. 

### Option 1


```
export PARSE_APPLICATION_ID=""
export PARSE_JAVASCRIPT_KEY=""
export PARSE_MASTER_KEY=""
```

With those 3 keys set, `parse-anywhere` will be able to run your project.

Note that if all keys are found in the environment, the process will stop and we'll use those.


### Option 2

You can set your keys in the `.parse.local` file or the `config/global.json`

Locate your configuration file and set the javascriptKey:

```
	{
		"my_parse_app": {
			"applicationId": "XXXXXXXXXXX",
      		"javascriptKey": REPLACE_ME,
      		"masterKey": "XXXXXXX","
		}
	}
```


###Limitations:

As of today, the cloud functions are not enabled yet, but that's in the plan since Parse just opened it in the form of webhooks. Sit tight, it's gonna be there soon.


## How to use

### From command line:

- From your parse app directory: 

	`parse-anywhere`

- If you have multiple apps in your config.json: 

	`parse-anywhere my_parse_app`

- From any directory:

	`parse-anywhere path/to/directory`
	

##Custom Configuration


Overriding the default configuration is at your own risks and may render your installation unstable, please use with care!

Environment:

	export PORT=8080 // set the port for the http server

It is possible to change the behavior of forever monitor through a rc file (we use the rc module).

To further configure, create a `.parse-anywhererc` or  file in your root project directory (replace my_app by the name of your app) 

Note: if you override the port in the RC configuration, the environment variable will be ignored.

From there, you can configure pretty much everything in forever monitor 

Visit [RC Standards](https://github.com/dominictarr/rc#standards) for more informations

All parameters of forever-monitor are available for configuration but some are automatically overriden (otherwise the whole app doesn't work)

The parameters from forever-monitor that can't be changed are:

`options, env, sourceDir, watchDirectory`

Even if `watchDirectory` can't be overriden, you can disable `watch` by setting `watch=false`

If you set `debug=1`, that will override the command parameter to `node --debug`, it has the same effect as `command="node --debug"`

The default options for are:

	{
		// Forever monitor options
    	command: "node",
    	spawnWith: {
      		setsid: false
    	},
    	watch:true,
    	minUptime: 1000,
    	spinSleepTime: 500,
    	
    	// expressjs port
    	port: 8080 || process.env.PORT
  	}



## Supported parse-provided cloud modules 
 
- [applinks](https://github.com/flovilmart/applinks-metatag) 
- [mailgun](https://github.com/flovilmart/parse-mailgun/tree/0.0.2-parse)
- [mandrill](https://github.com/flovilmart/parse-mandrill/tree/0.0.1-parse)
- [sendgrid](https://github.com/flovilmart/parse-sendgrid/tree/0.0.1-parse)
- [stripe](https://github.com/flovilmart/parse-stripe/tree/2.5.0-parse)
- [parse-image](https://github.com/flovilmart/parse-image)
- twilio
- [express](https://github.com/flovilmart/express/tree/3.1.0-parse)


All implementations match 100% what's available on CloudCode

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

