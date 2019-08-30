/*
* Author: Abdullah Hasan
* Date: 29/08/2019
* Description: Set of functions to retrieve number plate information from an image
* Installation:
*       Add these plugins to your cordova project
*       Plugins:
*               cordova-plugin-document-scanner 4.2.0 "Scan"
*               cordova-plugin-mobile-ocr 3.1.1 "Textocr"
* Usage: 
*       Add script reference to to this file in your html document then call relevant function from required js file
*       Example - To select a picture from the gallery:
*       
*       nPlate.get(0, function(numberPlate){
            console.log(numberPlate);
            });
*       
*
* Functions:
*           get(int sourceType, function callback)
*               sourceType: 0 = Gallery, 1 = Camera
*               callback: function that takes one argument that will contain the result i.e. function(result){ console.log(result);}
*               Returns: Array of strings containing discovered number plates. If no number plates were detected, then an empty array is returned.
*               Error: A string is returned containing the error message.
*
*           getRaw(string uri, function callback)
*               uri: Bypass Gallery or Camera by providing your own image uri
*               callback: see above
*               Returns: Array of strings containing discovered number plates. If no number plates were detected, then an empty array is returned.
*               Error: A string is returned containing the error message.
*
*/
nPlate = function () {
    function getPlate(srctype, cb) {
        scan.scanDoc(function (uri) {
            recover(uri, cb);
        }, function (err) {
            onFail(err, cb);
        }, { sourceType: srctype });

    }
    function onFail(err, cb) {
        console.log(err);
        cb(err);
    }
    function findPlate(uri, cb) {
        recover(uri, cb);
    }
    function recover(uri, cb) {
        textocr.recText(0, uri, function (txt) {
            var rx = "(^[A-Z]{2}[0-9]{2} [A-Z]{3}$)|(^[A-Z][0-9]{1,3} [A-Z]{3}$)|(^[A-Z]{3} [0-9]{1,3}[A-Z]$)|(^[0-9]{1,4} [A-Z]{1,2}$)|(^[0-9]{1,3} [A-Z]{1,3}$)|(^[A-Z]{1,2} [0-9]{1,4}$)|(^[A-Z]{1,3} [0-9]{1,3}$)";
            var blocks = txt.blocks.blocktext;
            console.log(blocks);
            var plate = [];
            for (var i = 0; i < blocks.length; i++) {
                var found = blocks[i].match(rx);

                if (found) {
                    plate.push(found[0]);
                }
            }
            console.log(plate);
            cb(plate);
        }, onFail);
    }
    return {
        get: getPlate,
        getRaw: findPlate
    }
}