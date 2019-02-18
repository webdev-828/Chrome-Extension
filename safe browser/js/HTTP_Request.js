
'use strict';


var getJSON = function(url, async, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, async);
    xhr.setRequestHeader('x-api-key', 'LLCvXwS3FrcfkhraRREft8Ib4');

    if(async === undefined || async === false){
        // Synchronous XHR.
        xhr.send();

       
        if (xhr.status === 200){

          
            return xhr.response;
        } else {
            return false;
        }
    } else {
        // Asynchronous XHR.
        xhr.responseType = 'json';
        xhr.timeout = 1000;

        xhr.onload = function() {
            var status = xhr.status;
            if (status === 200) {
                successHandler && successHandler(xhr.response);
            }
            else {
                errorHandler && errorHandler(status);
            }
        };

        xhr.send();
    }
};
