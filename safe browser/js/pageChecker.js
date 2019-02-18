
function isAllowed(url){
    allowedPages = ['block.si','http://www.block.si', 'http://block.si','http://www.google', 'chrome-extension://', 'chrome://'];
    
    for(var i = 0, i_len = allowedPages.length; i <= i_len; i++){
        if( i == i_len)
            return false;
        else if(url.href.indexOf(allowedPages[i]) != -1)
            return true;
    }
    
    
}


//Determine whether to block the URL or not
function ifBlock(url){
    //Send request to rating server
    var pageRating=getJSON('http://service2.block.si/getRating.json?url=' + url.hostname);
    console.log(pageRating);
    if(pageRating){
        //Parse received JSON data
        pageData=JSON.parse(pageRating);
   
        if(pageData.status==undefined){
            //Extract category from page data
           cat=pageData.Category.toString();
           console.log(cat);
           //Block if category is 2
           if(cat=='302' || cat=='306'){
               return {redirectUrl: "http://www.pebbleparkkids.org/whoops"};
           }
           else return {cancel: false};
            
        } 
    }else{
        return {cancel: false};
    }
                
}

