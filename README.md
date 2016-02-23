# npm-confluence-soap-api

# Confluence SOAP API

This package represents an Atlassian Confluence SOAP API wrapper.

## Installation

Install from npm registry:
```
$ npm install confluence-soap-api
```

This example demonstrates how to configure, create an instance and call methods of your instance.

```javascript
var Confluence = require("confluence-api");

var config = {
    username: "username",
    password: "password",
    baseUrl:  "https://your-confluence-space/confluence/plugins/servlet/soap-axis1/confluenceservice-v2?wsdl"
    //or https://your-confluence-space/rpc/soap-axis/confluenceservice-v2?wsdl
};

var confluence = new Confluence(config);

confluence.createInstance(function(instance) {
  instance.getServerInfo(function(res) {
    console.log("\n\n ==> getServerInfo() : \n" + JSON.stringify(res));
  });

  instance.getSpace("myprojectspace", function(res) {
    console.log("\n\n ==> getSpace() : \n" + JSON.stringify(res));
  });

  //param: pageId
  instance.getPage(18313812, function(res) {
    console.log("\n\n ==> getPage() : \n" + JSON.stringify(res));
  });

  //param: space, parentPageId, title, content
  instance.storePage("myprojectspace", 18313812, "TestTitle", "this is a sample content", function (res) {
    console.log("\n\n ==> storePage() : \n" + JSON.stringify(res));
  });

});

```

## Implemented methods

There is a great number of available wsdl methods Confluence provides. The methods I've implemented fulfilled my needs.
If you need more, just contact me and I will tell you if it is quickly implementable from my side.

## Contribution

Contribution to code and documentation is appreciated via github.

## Enjoy

Have fun!
