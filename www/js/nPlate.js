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
    //Function to open gallery or camera and select image. This is then passed to the text recovery function
    function getPlate(srctype, cb) {
        scan.scanDoc(function (uri) {
            console.log(uri);
            recover(uri, cb);
        }, function (err) {
            onFail(err, cb);
        }, { sourceType: srctype });

    }
    function onFail(err, cb) {
        console.log(err);
        cb(err);
    }
    //Function to use a raw file URI instead of gallery or camera. Checks to make sure file exists
    function findPlate(uri, cb) {
        window.resolveLocalFileSystemURL(uri, function (fileEntry) {
            console.log("nPlate: file exists");
            recover(uri, cb);
        }, function () {
            console.log("nPlate: Error, file not found");
            cb("File not found");
        });
    }

    //Function to recover text from the image and pass it through the numberplate regex.
    function recover(uri, cb) {
        textocr.recText(0, uri, function (txt) {
            var rx = "(^[A-Z]{2}[0-9]{2} [A-Z]{3}$)|(^[A-Z][0-9]{1,3} [A-Z]{3}$)|(^[A-Z]{3} [0-9]{1,3}[A-Z]$)|(^[0-9]{1,4} [A-Z]{1,2}$)|(^[0-9]{1,3} [A-Z]{1,3}$)|(^[A-Z]{1,2} [0-9]{1,4}$)|(^[A-Z]{1,3} [0-9]{1,3}$)";
            
            //Since number plates include spaces, we have to use blocks to ensure we get the whole numberplate in one string
            var blocks = txt.blocks.blocktext;
            //console.log(blocks);
            var plate = [];
            for (var i = 0; i < blocks.length; i++) {
                var found = blocks[i].match(rx); //use regex to match text
                if (found) { //if found is not null
                    plate.push(found[0]); //add it to the array. match returns an array of values, take the first one.
                }
            }
            console.log(plate);
            cb(plate); //run the callback on the recovered plates
        }, onFail);
    }
    return {
        get: getPlate,
        getRaw: findPlate
    }
}()