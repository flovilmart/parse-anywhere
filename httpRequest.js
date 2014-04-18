var _ = Parse._;
var formEncode = function(params){
    var encode = function(str) {
          str = (str + '')
            .toString();

          // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
          // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
          return encodeURIComponent(str)
            .replace(/!/g, '%21')
            .replace(/'/g, '%27')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')
            .replace(/\*/g, '%2A');
        }
    return _.map(params, function(value, key){
        return key+"="+encode(value);
    }).join("&");
}

var findContentType = function(options){
    var contentType;
    _.each(options, function(value, key){
        if (key.toLowerCase().indexOf("content-type")>=0) {
            contentType = value;
        }
    });
    return contentType;
}

var createUUID = function(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";

    for( var i=0; i < 30; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports = function(options){
    
    options.headers = options.headers || {};
    if (options.body && _.isObject(options.body)) {
      var contentType = findContentType(options.headers);
      var isBufferBody = Buffer.isBuffer(options.body);
      if (!contentType) {
        if (isBufferBody) {
          contentType = 'application/octet-stream';
        } else {
          contentType = 'application/x-www-form-urlencoded';
        }
        options.headers["Content-Type"] = contentType;
      }
      if (contentType.indexOf('application/x-www-form-urlencoded') === 0) {
        options.body = formEncode(options.body);
      } else if (contentType.indexOf('application/json') === 0) {
        options.body = JSON.stringify(options.body);
      } else if (!isBufferBody && (typeof options.body !== 'string')) {
        throw "Error: Don't know how to convert httpRequest body Object to " +
            contentType + ". To send raw bytes, please assign httpRequest " +
            "body to a Buffer object containing your data.";
      }
    }

    if (options.params) {
      if (options.url.indexOf('?') !== -1) {
        throw "Error: Can't set params if there is already a query parameter " +
          "in the url";
      }
      options.url += "?" + formEncode(options.params);
    }

    options.method = options.method || 'GET';
    options.method = options.method.toUpperCase();

    options.uuid = options.uuid || createUUID();

    var promise;
    if (Parse.Promise) {
      promise = new Parse.Promise();
    } else {
      // for backward compatibility to older JS SDKs
      promise = { resolve: function() {}, reject: function() {} };
    }

    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url, true);
    if (options.headers) {
        _.each(options.headers, function(value, key){
            xhr.setRequestHeader(key, value);
        })
    }
    xhr.send(options.body);
    var handled;
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (handled) {
          return;
        }
        handled = true;
        var httpResponse = {};
        if (xhr.status >= 200 && xhr.status < 300) {
          //var response;
          httpResponse.status = xhr.status;
          httpResponse.headers = xhr.getAllResponseHeaders();
          httpResponse.buffer = new Buffer(xhr.responseText);
          httpResponse.cookies = xhr.getResponseHeader("set-cookie");
          try {
            httpResponse.data = JSON.parse(xhr.responseText);
          } catch (e) {
           // promise.reject(e);
          }
          if (httpResponse) {
            promise.resolve(httpResponse);
          }
        } else {
          promise.reject(xhr);
        }
      }
    };
    return promise;
}
