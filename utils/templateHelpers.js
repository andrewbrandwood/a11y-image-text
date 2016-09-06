'use strict';

module.exports = (function() {

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

    modifierArray: function (modifierList, prefix) {
      var arr = modifierList.split(',');
      var modifierStr = '';
      for(var i = 0; i < arr.length; i++){
        var modifier = arr[i].replace(/ /g,'');
        modifierStr += prefix + '--' + modifier + ' ';
      }

      return modifierStr;
    },

    ifEqual: function(v1, v2, options) {
      if (v1 === v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    },

    ifContains: function(v1, v2, options) {

      if (v1 === undefined) {
        return options.inverse(this);
      }

      for (var i = 0; i < v1.length; i++) {
        if (v1[i] === v2) {
          return options.fn(this);
        }
      }

      return options.inverse(this);
    },

    ifLess: function (v1, v2, options) {
      if (v1 < v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    },

    ifMore: function (v1, v2, options) {
      if (v1 > v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    },

    constructQueryForPaging(model, options) {
      var query = '?';
      for (var parameter in model) {
        if (model.hasOwnProperty(parameter) && model[parameter] !== undefined && parameter !== 'p') {
          query = `${query}${parameter}=${model[parameter]}&`;
        }
      }
      return '' + options.fn({query: query.slice(0, -1)});
    },

    math(lvalue, operator, rvalue, options) {
      lvalue = parseFloat(lvalue);
      rvalue = parseFloat(rvalue);

      return {
        '+': lvalue + rvalue,
        '-': lvalue - rvalue,
        '*': lvalue * rvalue,
        '/': lvalue / rvalue,
        '%': lvalue % rvalue
      }[operator];
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
})();
