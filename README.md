# nPlate

Description: Simple Cordova number plate extractor based off two existing plugins. Add a reference to the main .js file in your html page and you can use the functions directly.

## Set up
To integrate with an existing project:

 - Install required plugins
	 - `cordova add plugin cordova-plugin-mobile-ocr --save`
	 - `cordova add plugin cordova-plugin-document-scanner --save`
 - Copy /www/js/nPlate.js to your project
 - Add a script reference to the html page where you will use this plugin
	 - `<script  type="text/javascript"  src="js/nPlate.js"></script>`
 - Refer to usage section to use the script


## Usage

Call script functions.

    nPlate.get(srcType,callback);
    srcType => int, 0 = Gallery, 1 = Camera, To either use gallery or camera.
    callback => function(string), Callback function that will run upon 
								  success with number plate string as argument
	
	nPlate.getRaw(URI,callback);
	URI => URI that points to image. Use this to bypass gallery or camera selection.
	callback => see above
	
	Examples:
	nPlate.get(0,function(plate){
				 document.getElementById('plate').innerText  =  plate;
				 });

## Credits

 - cordova-plugin-document-scanner 4.2.0 "Scan"
	 - [https://www.npmjs.com/package/cordova-plugin-document-scanner](https://www.npmjs.com/package/cordova-plugin-document-scanner)
 - cordova-plugin-mobile-ocr 3.1.1 "Textocr"
	 - [https://www.npmjs.com/package/cordova-plugin-mobile-ocr](https://www.npmjs.com/package/cordova-plugin-mobile-ocr)
 - UK Number plate Regex
		 - [https://gist.github.com/danielrbradley/7567269](https://gist.github.com/danielrbradley/7567269)
