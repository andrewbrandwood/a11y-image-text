function getAverageColourAsRGB(sourceImage, textArea){
  var colorThief = new ColorThief();
  var result = colorThief.getColor(sourceImage,null,textArea);
  var rgb = {r:result[0],g:result[1],b:result[2]};
  rgb.css = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
  console.log(rgb);
  return rgb;
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
};

function getAcessibility(textColor, imageColour){
  var ratio = 1;
  var l1 = getLuminance([textColor.r, textColor.g, textColor.b]);
  var l2 = getLuminance([imageColour.r, imageColour.g, imageColour.b]);
  if (l1 >= l2) {
    ratio = (l1 + .05) / (l2 + .05);
  } else {
    ratio = (l2 + .05) / (l1 + .05);
  }
  ratio = Math.round(ratio * 100) / 100; // round to 2 decimal places
  console.log(ratio);
  console.log('WCAG 2 AA Compliant ', ratio >= 4.5 ? 'YES' : 'NO');
  console.log('WCAG 2 AA Compliant (18pt+) ', ratio >= 3 ? 'YES' : 'NO');
  console.log('WCAG 2 AAA Compliant ', ratio >= 7 ? 'YES' : 'NO');
  console.log('WCAG 2 AAA Compliant (18pt+) ', ratio >= 4.5 ? 'YES' : 'NO');
}
