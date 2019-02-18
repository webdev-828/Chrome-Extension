
//Create URL object
var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};


//Listen for tab update(s) and check new URL
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){  
    //Check if tab change includes an url
   if('url' in changeInfo && changeInfo.url.indexOf('chrome') == -1 && changeInfo.status=='complete'){
       //If URL isn't among the allowed ones... 
       if(!isAllowed(url)){
            //...check if it has to be blocked
            block=ifBlock(url); 
            if(block!=undefined && 'redirectUrl' in block)
                chrome.tabs.update(tabId, {url: block.redirectUrl}); 
        
                
       }
       
   } 
         
});

//Listen for web requests -> block web request if necessary and redirect page
chrome.webRequest.onBeforeRequest.addListener(function(details){
   if(details.url.indexOf('block.si')==-1){
        url=getLocation(details.url);
        return ifBlock(url);     
   }
    
}, {urls: ["<all_urls>"], types: ["main_frame"]} , ["blocking"]);


