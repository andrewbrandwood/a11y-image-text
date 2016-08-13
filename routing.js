var fileSystem = require('fs');

module.exports = function(website){
	fileSystem.readdirSync(__dirname + '/routes').forEach(function(file){
		require('./routes/' + file)(website);
	});
};
