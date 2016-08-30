

/**
* =========================================================
* 	INIT SLIDERS
*
*/
var fr = document.getElementById("fr-slider-input");
var fg = document.getElementById("fg-slider-input");
var fb = document.getElementById("fb-slider-input");

var fh = document.getElementById("fh-slider-input");
var fs = document.getElementById("fs-slider-input");
var fv = document.getElementById("fv-slider-input");

var br = document.getElementById("br-slider-input");
var bg = document.getElementById("bg-slider-input");
var bb = document.getElementById("bb-slider-input");

var bh = document.getElementById("bh-slider-input");
var bs = document.getElementById("bs-slider-input");
var bv = document.getElementById("bv-slider-input");


var fore = document.getElementById("fc");
fore.onchange = function () {
  var v = this.value.toUpperCase().replace(/[^0-9a-zA-Z]/g,'');
  this.value = v;

	if(/^[0-9A-F]{3}$|^[0-9A-F]{6}$/.test(v) ){
	        if(v.length == 3) {
	            v = v.match(/[0-9A-F]/g);
	            v = v[0] + v[0] + v[1] + v[1] + v[2] + v[2];
				this.value = v;
	        }

			var r = parseInt(v.substr(0,2),16);
			var g = parseInt(v.substr(2,2),16);
			var b = parseInt(v.substr(4,2),16);
			updateRGBSliders('f', [r,g,b]);
	}

	updateColourResults();
  updateHash();
};

var back = document.getElementById("bc");
back.onchange = function () {
  var v = this.value.toUpperCase().replace(/[^0-9a-zA-Z]/g,'');
  this.value = v;

	if(/^[0-9A-F]{3}$|^[0-9A-F]{6}$/.test(v) ){
	        if(v.length == 3) {
	            v = v.match(/[0-9A-F]/g);
	            v = v[0] + v[0] + v[1] + v[1] + v[2] + v[2];
				this.value = v;
	        }

			var r = parseInt(v.substr(0,2),16);
			var g = parseInt(v.substr(2,2),16);
			var b = parseInt(v.substr(4,2),16);
			updateRGBSliders('b', [r,g,b]);
	}

	updateColourResults();
  updateHash();
};

/**
* =========================================================
* 	CHANGE EVENTS FOR RGB SLIDERS
*
*/
var isStartedBy = null;
fr.onchange = fg.onchange = fb.onchange = function () {
	if (!isStartedBy) {
		isStartedBy = 'rgb';
	}
	if (isStartedBy == 'rgb') {
		var r = fr.value;
		var g = fg.value;
		var b = fb.value;
		var hsv = rgbToHsv(r,g,b);
		updateHSVSliders('f', hsv);
		updateColourResults();
		updateColourValue('f');
    updateHash();
		isStartedBy = null;
	}
}

br.onchange = bg.onchange = bb.onchange = function () {
	if (!isStartedBy) {
		isStartedBy = 'rgb';
	}
	if (isStartedBy == 'rgb') {
		var r = br.value;
		var g = bg.value;
		var b = bb.value;
		var hsv = rgbToHsv(r,g,b);
		updateHSVSliders('b', hsv);
		updateColourResults();
		updateColourValue('b');
    updateHash();
		isStartedBy = null;
	}
}

fh.onchange = fs.onchange = fv.onchange = function () {
	if (!isStartedBy) {
		isStartedBy = 'hsv';
	}
	if (isStartedBy == 'hsv') {
		var h = fh.value;
		var s = fs.value;
		var v = fv.value;
		var rgb = hsvToRgb(h,s,v);
		updateRGBSliders('f', rgb);
		updateColourResults();
		updateColourValue('f');
    updateHash();
		isStartedBy = null;
	}
}

bh.onchange = bs.onchange = bv.onchange = function () {
	if (!isStartedBy) {
		isStartedBy = 'hsv';
	}
	if (isStartedBy == 'hsv') {
		var h = bh.value;
		var s = bs.value;
		var v = bv.value;
		var rgb = hsvToRgb(h,s,v);
		updateRGBSliders('b', rgb);
		updateColourResults();
		updateColourValue('b');
    updateHash();
		isStartedBy = null;
	}
}

/**
* =========================================================
* 	INIT INITIAL COLOURS
*
*/
// grab initial colours from hash
var pairs = location.hash.slice(1).split(',');

var result = {};
pairs.forEach(function(pair) {
    pair = pair.split('=');
    result[pair[0]] = pair[1];
});

fore.value = result['fg'] || '33FF33';
fore.onchange();


back.value = result['bg'] || '333333';
back.onchange();

window.onload = function() {
}



/**
* =========================================================
* 	UPDATE FUNCTIONS
*
*/
function updateHSVSliders(prefix, hsv) {
	var p = prefix;
	window[p + 'h'].value = hsv[0];
	window[p + 's'].value = hsv[1];
	window[p + 'v'].value = hsv[2];
}

function updateRGBSliders(prefix, rgb) {
	var p = prefix;
	window[p + 'r'].value = rgb[0];
	window[p + 'g'].value = rgb[1];
	window[p + 'b'].value = rgb[2];
}

function updateColourValue(prefix) {
	document.getElementById(prefix + 'c').value =
		pad(window[prefix + 'r'].value) +
		pad(window[prefix + 'g'].value) +
		pad(window[prefix + 'b'].value);
}

function updateHash() {
  var h = "fg=fghash,bg=bghash";
  h = h.replace('fghash', fore.value);
  h = h.replace('bghash', back.value);
  window.location.hash = h;
}

function updateColourResults(){

	// update preview
	document.getElementById("fcolor-result").style.backgroundColor = "rgb(" + fr.value + "," + fg.value + "," + fb.value + ")";
  document.getElementById("viewresult").style.color = "rgb(" + fr.value + "," + fg.value + "," + fb.value + ")";

	document.getElementById("bcolor-result").style.backgroundColor = "rgb(" + br.value + "," + bg.value + "," + bb.value + ")";
  document.getElementById("viewresult").style.backgroundColor = "rgb(" + br.value + "," + bg.value + "," + bb.value + ")";

  updateHSVSliders('f', rgbToHsv( fr.value, fg.value, fb.value ));
  updateHSVSliders('b', rgbToHsv( br.value, bg.value, bb.value ));

	// perform math for WCAG1
	var brightnessThreshold = 125;
	var colorThreshold = 500;

	var bY=((br.value * 299) + (bg.value * 587) + (bb.value * 114)) / 1000;
	var fY=((fr.value * 299) + (fg.value * 587) + (fb.value * 114)) / 1000;
	var brightnessDifference = Math.abs(bY-fY);

  var colorDifference = (Math.max (fr.value, br.value) - Math.min (fr.value, br.value)) +
                        (Math.max (fg.value, bg.value) - Math.min (fg.value, bg.value)) +
                        (Math.max (fb.value, bb.value) - Math.min (fb.value, bb.value));

	document.getElementById("bDiff").value = brightnessDifference;
	document.getElementById("cDiff").value = colorDifference;

	if ((brightnessDifference >= brightnessThreshold) && (colorDifference >= colorThreshold))	{
	    document.getElementById("cResult").value = "YES"; // compliant
	}else if ((brightnessDifference >= brightnessThreshold) || (colorDifference >= colorThreshold)){
		document.getElementById("cResult").value = "sort of..."; // sort of compliant
	}else{
		document.getElementById("cResult").value = "NO"; // not compliant "Poor visibility between text and background colors."
	}

	// perform math for WCAG2
	function getLuminance (rgb){

		for (var i =0; i<rgb.length; i++) {
			if (rgb[i] <= 0.03928) {
				rgb[i] = rgb[i] / 12.92;
			} else {
				rgb[i] = Math.pow( ((rgb[i]+0.055)/1.055), 2.4 );
			}
		}
		var l = (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]);
		return l;
	};
	var ratio = 1;
	var l1 = getLuminance([fr.value/255, fg.value/255, fb.value/255]);
	var l2 = getLuminance([br.value/255, bg.value/255, bb.value/255]);

	if (l1 >= l2) {
		ratio = (l1 + .05) / (l2 + .05);
	} else {
		ratio = (l2 + .05) / (l1 + .05);
	}
	ratio = Math.round(ratio * 100) / 100; // round to 2 decimal places
	document.getElementById('contrastratio').value = ratio;
	document.getElementById('w2b').value = (ratio >= 4.5 ? 'YES' : 'NO');
	document.getElementById('w2a').value = (ratio >= 3 ? 'YES' : 'NO');
	document.getElementById('w2aaab').value = (ratio >= 7 ? 'YES' : 'NO');
	document.getElementById('w2aaaa').value = (ratio >= 4.5 ? 'YES' : 'NO');
}

/**
* =========================================================
* 	UTILITY FUNCTIONS
*
*/

function pad(s) {
    return ('00' + (new Number(s)).toString(16).toUpperCase()).slice(-2);
}

/**
* Converts HSV to RGB value.
*
* @param {Integer} h Hue as a value between 0 - 360 degrees
* @param {Integer} s Saturation as a value between 0 - 100 %
* @param {Integer} v Value as a value between 0 - 100 %
* @returns {Array} The RGB values  EG: [r,g,b], [255,255,255]
*/
function hsvToRgb(h,s,v) {

    var s = s / 100,
         v = v / 100;

    var hi = Math.floor((h/60) % 6);
    var f = (h / 60) - hi;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    var rgb = [];

    switch (hi) {
        case 0: rgb = [v,t,p];break;
        case 1: rgb = [q,v,p];break;
        case 2: rgb = [p,v,t];break;
        case 3: rgb = [p,q,v];break;
        case 4: rgb = [t,p,v];break;
        case 5: rgb = [v,p,q];break;
    }

    var r = Math.min(255, Math.round(rgb[0]*256)),
        g = Math.min(255, Math.round(rgb[1]*256)),
        b = Math.min(255, Math.round(rgb[2]*256));

    return [r,g,b];

}

/**
* Converts RGB to HSV value.
*
* @param {Integer} r Red value, 0-255
* @param {Integer} g Green value, 0-255
* @param {Integer} b Blue value, 0-255
* @returns {Array} The HSV values EG: [h,s,v], [0-360 degrees, 0-100%, 0-100%]
*/
function rgbToHsv(r, g, b) {

    var r = (r / 255),
         g = (g / 255),
  	 b = (b / 255);

    var min = Math.min(Math.min(r, g), b),
        max = Math.max(Math.max(r, g), b),
        delta = max - min;

    var value = max,
        saturation,
        hue;

    // Hue
    if (max == min) {
        hue = 0;
    } else if (max == r) {
        hue = (60 * ((g-b) / (max-min))) % 360;
    } else if (max == g) {
        hue = 60 * ((b-r) / (max-min)) + 120;
    } else if (max == b) {
        hue = 60 * ((r-g) / (max-min)) + 240;
    }

    if (hue < 0) {
        hue += 360;
    }

    // Saturation
    if (max == 0) {
        saturation = 0;
    } else {
        saturation = 1 - (min/max);
    }

    return [Math.round(hue), Math.round(saturation * 100), Math.round(value * 100)];
}
