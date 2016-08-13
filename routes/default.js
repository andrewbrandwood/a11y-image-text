var path = require('path');
var templateHelpers = require(path.resolve(__dirname, '..', 'utils', 'templateHelpers.js'))();
var templateData = require(path.resolve(__dirname, '..', '_data', 'styleguide.json'));

var WebsiteController = function (app) {
	// Public functions
	var app = app;

	this.get = function(request, response) {
		var view = parseUrl(request.params.loc);
		response.render(view, createModel({req: request, view: view}));
	};

	function createModel(params){

		var req = params.req;
		var queryString = req.query.cdn;
		var loc = params.view;


		var model = {
			layout: false,
			helpers: templateHelpers,
			content:	templateData
		}

		return model;
	}

	function trimFileExt(filename){
		return filename.substring(0,(filename.length-4));
	}

	function isSystemFile(filename){
		return filename.charAt(0) === '.'
	}

	function parseUrl(url){
		if(url === '/' || url === '' || url === undefined || url === 'favicon.ico'){
			// this acts as the default view file when working locally
			url = 'default'
		}
		return url;
	}

};

module.exports = function(app) {
	var controller = new WebsiteController(app);

	app.get(['/','/:loc','/:loc/'], controller.get);
};
