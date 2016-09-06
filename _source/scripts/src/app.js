(function(window, $, undefined){
	"use strict";

	var Website = Website || {};

	Website = function(){

		var _self = this;
		var validationArr = {
				aaArr: {passed:0,failed:0},
				aaPlusArr: {passed:0,failed:0},
				aaaArr: {passed:0,failed:0},
				aaaPlusArr: {passed:0,failed:0}
			};

		function run(){

			var textColor = getColor($('[data-js-color]'));
			setTextColor(textColor);
			setColors();
		}

		function setDraggable(){
			var $textArea = $('[data-text-drag-frame]');
			$textArea.draggable({ containment: 'parent', scroll: false,
				stop: function() {
					$(window).trigger('draggable:stopped');
				}
			});
		}

		function getTextareaDimensions(){
			var $textArea = $('[data-textarea]');
			var $pictureFrame = $('[data-picture-frame]');
			var w = $textArea.width();
			var h = $textArea.height();
			var tp = $textArea.offset();
			var pp = $pictureFrame.offset();
			var x = tp.left - pp.left;
			var y = tp.top - pp.top;
			return {w:w,h:h,x:x,y:y};
		}

		function getTextAreaColor(){
			var $textArea = $('[data-textarea]');

			var rgbString = $textArea.css('color');
			var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			delete parts[0];
			return {r:parseInt(parts[1]), g:parseInt(parts[2]), b:parseInt(parts[3]) };
		}

		function setColors(ImgId){
			var $img = $('[data-main-image]');

			var textAreaDimensions = getTextareaDimensions();
			var bgColor = getAverageColourAsRGB($img.get(0), textAreaDimensions);

			setBgColor(bgColor.css);
			setPallette(bgColor.palette);
			displayResults(getAcessibility(getTextAreaColor(),bgColor));
		}

		function setPallette(paletteArr){
			var $palette = $('[data-palette-container]');
			var textAreaColor = getTextAreaColor();
			$palette.html('');
			for(var i = 0; i < paletteArr.length; i++){
				var color = 'rgb('+ paletteArr[i][0] + ',' + paletteArr[i][1] + ',' + paletteArr[i][2]+ ')';
				var $paletteItem = $('<div />', {
					'class': 'palette__item'
				});
				var $paletteColor = $('<div />', {
					'css': {'background-color': color},
					'class': 'palette__item-color'
				});
				$paletteItem.append($paletteColor);
				var a11yResults = getAcessibility(textAreaColor,{r:paletteArr[i][0], g: paletteArr[i][1], b: paletteArr[i][2] });

				var $accesibilityItem = $('<div />', {
					"class": 'accesibility-palette'
				});
				for(var item in a11yResults){
					var validIdentifier = [a11yResults[item]][0].toLowerCase();
					validationArr[item + 'Arr'][validIdentifier]++;


					var $item = $('<div />', {
						"class": 'accesibility-palette-indicator ' + isValidCSS(a11yResults[item]),
						"text": a11yResults[item]
					});
					$accesibilityItem.append($item);
				}
				$paletteItem.append($accesibilityItem);

				$palette.append($paletteItem);

			}
		}

		function setColor(color){
			var bgColor = getBgColor();
			var textColor = getTextColor();
			run();
		}

		function setTextColor(color){
				var $labels = $('[data-labels]');
				$labels.css({'color': '#' + color});
		}

		function setBgColor(color){
				var $bg = $('body');
				$bg.css({'background-color': color});
		}

		function getColor(e){
			var $input = $(e);
			var color = $input.val();
			return color;
		}

		function handleImage(e){
			var reader = new FileReader(e);
			reader.onload = function(event){
				var img = new Image();
				$('[data-main-image]').get(0).src = event.target.result;
				run();
			}
			reader.readAsDataURL(e.target.files[0]);
		}

		function isValidCSS(result){
			var cssClass = 'complience-indicators__item';
			return result === 'Passed' ? (cssClass + '--is-valid') : (cssClass + '--is-invalid');
		}

		function displayResults(results){
			$('[complience-indicators-item]').removeClass('complience-indicators__item--is-valid, complience-indicators__item--is-invalid');
			var $aa = $('[complience-indicators-item="aa"]');
			var $aaPlus = $('[complience-indicators-item="aaPlus"]');
			var $aaa = $('[complience-indicators-item="aaa"]');
			var $aaaPlus = $('[complience-indicators-item="aaaPlus"]');
			$aa.addClass(isValidCSS(results.aa));
			$aaPlus.addClass(isValidCSS(results.aaPlus));
			$aaa.addClass(isValidCSS(results.aaaPlus));
			$aaaPlus.addClass(isValidCSS(results.aaaPlus));

			var textIndicator = '[data-complient-indicator]';
			$aa.find(textIndicator).text(results.aa);
			$aaPlus.find(textIndicator).text(results.aaPlus);
			$aaa.find(textIndicator).text(results.aaaPlus);
			$aaaPlus.find(textIndicator).text(results.aaaPlus);

		}

		function updateFontsize(e){
			var fontSize = $(e.currentTarget).val();
			$('[data-textarea]').css({
				'font-size': fontSize +'px'
			});
			run();
		}

		function init(){
			$(window).on('draggable:stopped', run);
			$('[data-js-color]').on('change', run);
			$('[data-image-uploader-file]').on('change', handleImage);
			$('[data-font-size]').on('change', updateFontsize);
			run();
			setDraggable();
		}

		init();
	};



	$(window).on('load', function(){
		var website = new Website();
	});





})(window, jQuery);
