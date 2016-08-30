function getAverageColourAsRGB (img) {
  var canvas = document.createElement('canvas'),
    context = canvas.getContext && canvas.getContext('2d'),
    rgb = {r:102,g:102,b:102}, // Set a base colour as a fallback for non-compliant browsers
    pixelInterval = 5, // Rather than inspect every single pixel in the image inspect every 5th pixel
    count = 0,
    i = -4,
    data, length;

  // return the base colour for non-compliant browsers
  if (!context) { return rgb; }

  // set the height and width of the canvas element to that of the image
  var height = canvas.height = img.naturalHeight || img.offsetHeight || img.height,
    width = canvas.width = img.naturalWidth || img.offsetWidth || img.width;

  context.drawImage(img, 0, 0);

  try {
  data = context.getImageData(0, 0, width, height);
  } catch(e) {
  // catch errors - usually due to cross domain security issues
  alert(e);
  return rgb;
  }

  data = data.data;
  length = data.length;
  while ((i += pixelInterval * 4) < length) {
  count++;
  rgb.r += data[i];
  rgb.g += data[i+1];
  rgb.b += data[i+2];
  }

  // floor the average values to give correct rgb values (ie: round number values)
  rgb.r = Math.floor(rgb.r/count);
  rgb.g = Math.floor(rgb.g/count);
  rgb.b = Math.floor(rgb.b/count);

  rgb.css = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';

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
  console.log(ratio >= 4.5 ? 'YES' : 'NO');
  console.log(ratio >= 3 ? 'YES' : 'NO');
  console.log(ratio >= 7 ? 'YES' : 'NO');
  console.log(ratio >= 4.5 ? 'YES' : 'NO');
}


  //
  //
  // ratio = Math.round(ratio * 100) / 100; // round to 2 decimal places
  // document.getElementById('contrastratio').value = ratio;
  // document.getElementById('w2b').value = (ratio >= 4.5 ? 'YES' : 'NO');
  // document.getElementById('w2a').value = (ratio >= 3 ? 'YES' : 'NO');
  // document.getElementById('w2aaab').value = (ratio >= 7 ? 'YES' : 'NO');
  // document.getElementById('w2aaaa').value = (ratio >= 4.5 ? 'YES' : 'NO');
