var fs = require('fs')

function readParameter(name) {
	var fileName = `generator/${name}.param`
	var content = fs.readFileSync(fileName).toString().trim()

	return content
}

function checkOrRaiseError(condition, errorMessage) {
	if (!condition) {
		console.error(errorMessage)
		process.exit(1)
	}
}

function deleteFolder(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolder(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

module.exports = {
	readParameter,
	checkOrRaiseError,
	deleteFolder
}
