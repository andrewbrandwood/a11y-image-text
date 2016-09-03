function getAverageColourAsRGB(sourceImage, textArea){
  var colorThief = new ColorThief();
  var result = colorThief.getColor(sourceImage,null,textArea);
  var rgb = {r:result[0],g:result[1],b:result[2]};
  rgb.css = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
  return rgb;
}

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
    if (max === 0) {
        saturation = 0;
    } else {
        saturation = 1 - (min/max);
    }

    return [Math.round(hue), Math.round(saturation * 100), Math.round(value * 100)];
}

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
}

function wcag1(){
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
}

function getAcessibility(textColor, imageColour){
  var ratio = 1;
  var l1 = getLuminance([textColor.r, textColor.g, textColor.b]);
  var l2 = getLuminance([imageColour.r, imageColour.g, imageColour.b]);
  if (l1 >= l2) {
    ratio = (l1 + 0.05) / (l2 + 0.05);
  } else {
    ratio = (l2 + 0.05) / (l1 + 0.05);
  }
  ratio = Math.round(ratio * 100) / 100; // round to 2 decimal places
  console.log('Contrast ratio ', ratio);
  console.log('WCAG 2 AA Compliant ', ratio >= 4.5 ? 'YES' : 'NO');
  console.log('WCAG 2 AA Compliant (18pt+) ', ratio >= 3 ? 'YES' : 'NO');
  console.log('WCAG 2 AAA Compliant ', ratio >= 7 ? 'YES' : 'NO');
  console.log('WCAG 2 AAA Compliant (18pt+) ', ratio >= 4.5 ? 'YES' : 'NO');

}
