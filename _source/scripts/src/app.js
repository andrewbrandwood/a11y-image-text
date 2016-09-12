(function(window, $, undefined){
	"use strict";

	var Website = Website || {};

	Website = function(){

		var _self = this;
		var validationArr = {};

		function resetValidation(){
			validationArr = {
					aaArr: {passed:0,failed:0},
					aaPlusArr: {passed:0,failed:0},
					aaaArr: {passed:0,failed:0},
					aaaPlusArr: {passed:0,failed:0}
				};
			}

		function run(){
			resetValidation();
			var textColor = getColor($('[data-js-color]'));
			setColors(textColor);
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

		function getPercentagePassed(type){
			var total = validationArr[type].passed + validationArr[type].failed;
			var perc = validationArr[type].passed / total * 100;
			return perc;
		}

		function updateTextColor(color){
			$('[data-label]').css({
				'color': '#' + color
			});
		}

		function setColors(color){
			var $img = $('[data-main-image]');

			var textAreaDimensions = getTextareaDimensions();
			var bgColor = getAverageColourAsRGB($img.get(0), textAreaDimensions);

			setPallette(bgColor.palette);
			displayResults(getAcessibility(getTextAreaColor(),bgColor), bgColor);

			updateOverall(bgColor.palette);
			updateTextColor(color);
		}

		function updateOverall(paletteArr){
			var $paletteContainer = $('[data-accessibility-palette-overall]');
			$paletteContainer.html('');
			var indicator = [];
			var passedTotal = Object.keys(paletteArr).length;

			for(var item in validationArr){
				var modifier = ((validationArr[item].passed-1) >= passedTotal) ? 'passed' : 'failed';
				var perc = getPercentagePassed(item);
				var stateModifier = (perc >= 65 && perc < 100) ? '--nearly' : isValidCSS(modifier);
				indicator.push({ type: item, state: modifier, perc:perc, stateModifier: stateModifier});
			}
			var template = window.a11y.templates['palette-table'];
			$paletteContainer.append(template({ color: 'transparent', indicator: indicator, headerVisible: true }));
		}

		function setPallette(paletteArr){
			var $palette = $('[data-palette-container]');
			var textAreaColor = getTextAreaColor();

			$palette.html('');
			for(var i = 0; i < paletteArr.length; i++){
				var color = 'rgb('+ paletteArr[i][0] + ',' + paletteArr[i][1] + ',' + paletteArr[i][2]+ ')';

				var a11yResults = getAcessibility(textAreaColor,{r:paletteArr[i][0], g: paletteArr[i][1], b: paletteArr[i][2] });

				var indicator = [];
				for(var item in a11yResults){
					indicator.push({ type: item, state: a11yResults[item], stateModifier: isValidCSS(a11yResults[item])});
					validationArr[item+'Arr'][a11yResults[item].toLowerCase()] ++;
				}

				var template = window.a11y.templates['palette-table'];
				$palette.append(template({ color: color, indicator: indicator}));
			}

		}

		function setColor(color){
			var bgColor = getBgColor();
			var textColor = getTextColor();
			run();
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
			};
			reader.readAsDataURL(e.target.files[0]);
		}

		function isValidCSS(result){
			return result.toLowerCase() === 'passed' ? '--is-valid' : '--is-invalid';
		}

		function displayResults(results, bgColor){
			var $mainColorContainer = $('[data-accessibility-palette]');
			$mainColorContainer.html('');
			var indicator = [];
			for(var item in results){
				indicator.push({ type: item, state: results[item], stateModifier: isValidCSS(results[item]) });
				validationArr[item+'Arr'][results[item].toLowerCase()] ++;
			}
			var template = window.a11y.templates['palette-table'];
			$mainColorContainer.append(template({ color: bgColor.css, indicator: indicator, headerVisible: true }));
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
