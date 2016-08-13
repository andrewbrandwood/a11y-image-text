(function () {
  'use strict';

  module.exports = function() {

    /**
     * Set of handlebar helpers that can be used in templates
     */

    return {
        /**
         * Get the string value of a JSON object, useful for debugging template data
         *
         * @param  {Object} obj JSON object
         * @return {String}     Provided object as a string
         *
         * @example
         * {{ json data }}
         */
        json: function(obj) {
            return JSON.stringify(obj);
        },

        /**
         * pass in multiple modifiers (BEM) to be used in partials
         *
         * @param  {modifierList} comma separated string
         * @return {modifier}     start of CSS class
         *
         * @example temaplate
         * {{>myPartial modifier="mod1,mod2" }}
         *
         * @example partial
         * {{ modifierArray modifier 'my-element-class'}}
         */

        modifierArray: function(modifierList, prefix){
            var arr = modifierList.split(',');
            var modifierStr = '';
            for(var i = 0; i < arr.length; i++){
                modifierStr += prefix + '--' + arr[i] + ' ';
            }

            return modifierStr;
        },

        ifCond: function(v1, v2, options) {
          if (v1 === v2) {
            return options.fn(this);
          }
          return options.inverse(this);
        },

        /**
         * Helper that repeats blocks of code, providing an index to be utilised
         *
         * @param  {Bool} 	n           Number of times to repeat a code block
         * @param  {Obj} 	options
         * @return {String}             HTML string of content to be put into template
         *
         * @example
         * {{#repeat 4}} <h{{@index}}>Hello, World!</h{{@index}}> {{/repeat}}
         */
    	repeat: function (n, options) {
         	var content = '',
         	count = n - 1;

         	for (var i = 0; i <= count; i++) {
         		var data = {
         			index: i + 1
         		};
         		content += options.fn(this, {data: data});
         	}

         	return content;
         }
    };
  };
}());
