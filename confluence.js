/**
* inspired by https://github.com/johnpduane/confluence-api
*
*/
 
var soap = require('soap');
var self = {};
 
function Confluence(config) {
    if (!(this instanceof Confluence)) return new Confluence(config);
 
    if (!config) {
        throw new Error("Confluence module expects a config object.");
    }
    else if (!config.username || ! config.password) {
        throw new Error("Confluence module expects a config object with both a username and password.");
    }
    else if (!config.baseUrl) {
        throw new Error("Confluence module expects a config object with a baseUrl.");
    }
 
    self.config = config;
}
 
 
Confluence.prototype.createInstance = function(callback) {
  var _this = this;
  soap.createClient(self.config.baseUrl, function(err, client) {
      if (err) throw err;
      client.login({name: self.config.username, password: self.config.password}, function(err, result) {
          self.token = result.loginReturn.$value;
          if (typeof(callback) == "function") callback(_this);
      });
  });
}
 
 
 
Confluence.prototype.getServerInfo = function(callback) {
  soap.createClient(self.config.baseUrl, function(err, client) {
    if (err) throw err;
    client.getServerInfo( { token: self.token }, function(err, result) {
      if (typeof(callback) == "function") callback(result);
    });
  });
};
 
Confluence.prototype.getPage = function(pageId, callback) {
  soap.createClient(self.config.baseUrl, function(err, client) {
    if (err) throw err;
    client.getPage( { token: self.token, pageId: pageId }, function(err, result) {
      if (typeof(callback) == "function") callback(result);
    });
  });
}
 
Confluence.prototype.storePage = function(space, parentId, title, content, callback) {
  soap.createClient(self.config.baseUrl, function(err, client) {
    if (err) throw err;
    client.storePage( {  token: self.token,
                       remotePage : {
                         space    : space,
                         parentId : parentId,
                         title    : title,
                         content  : content
                       }
                     }, function(err, result) {
      if (err) throw err;
      if (typeof(callback) == "function") callback(result);
    });
  });
}
 
Confluence.prototype.getSpace = function(space, callback) {
  soap.createClient(self.config.baseUrl, function(err, client) {
    if (err) throw err;
    client.getSpace( { token: self.token, space: space }, function(err, result) {
      if (err) throw err;
      if (typeof(callback) == "function") callback(result);
    });
  });
}
 
module.exports = Confluence;
