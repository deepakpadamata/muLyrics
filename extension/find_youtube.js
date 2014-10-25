chrome.tabs.getAllInWindow(null, function(tabs){
	var c = -1;
    for (var i = 0; i < tabs.length; i++) {	
    	chrome.tabs.sendRequest(tabs[i].id, { action: "xxx" });

    	if((JSON.stringify(tabs[i].title).indexOf("YouTube")) > -1)
    		{
    			c= i;		
    			break;
	    	}
	}
    if (c == -1){
    }
    else{
       alert(JSON.stringify(tabs[c].title));
    }  
    // chrome.windows.create({
    //     'url': 'window.html',
    //     'type' : "panel"
    // })

    var req = new XMLHttpRequest();
        req.open("GET", "/186041.lrc", true);
        req.addEventListener("load", function(e) {
            var txt = req.responseText
            alert(txt);
        }, false)
        req.send(null);

    
});