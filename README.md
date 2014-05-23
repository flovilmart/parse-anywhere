parse-env
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
Starting version 0.0.6, you'll need homebrew to install hard dependencies for
the parse-image module

#####With npm
	
	npm install git://github.com/flovilmart/parse-env.git -g
	

#####From source:

clone the repo in your favorite place:

	git clone git://github.com/flovilmart/parse-env.git
	cd parse-env
	npm install -g
	
That will install the local parse environment wrapper in the parse-env directory

How to use
======

#### In your parse app folder

instead of running `parse develop [app name]`, your can now run `parse-env [app name]`

app name is optional

#### From any folder

run `parse-env path-to-your-parse-app [app name]`


####For non global installations, in your cloned directory

`./parse-env path-to-your-parse-app [app name]`

where path-to-your-parse-app is the full path to your parse app root folder with
a trailing / and app name is an optional application name in your global/config.json file

Happy parsing!


Change Log
=========

#####0.0.6:
Adds support for parse-image cloud module

#####0.0.2:

Ability to install system wide

#####0.0.1:

Proof of concept

