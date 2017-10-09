var glob = require("glob");
var fs = require("fs");
var fd = fs.openSync("app.depdencies.js", 'a');


glob("app/components/**/*.js",{}, function (er, files) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.
  fs.unlinkSync("app.depdencies.js");

  files = files.map(function(item){
  	var reqStr = "require('./"+item+"');\n";
  	fs.appendFileSync("app.depdencies.js",reqStr);
  })
})