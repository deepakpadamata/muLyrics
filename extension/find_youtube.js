chrome.tabs.getAllInWindow(null, function(tabs){
	var c;
    for (var i = 0; i < tabs.length; i++) {	
    	chrome.tabs.sendRequest(tabs[i].id, { action: "xxx" });

    	if((JSON.stringify(tabs[i].title).indexOf("YouTube")) > -1) {
    		c= i;		
    		break;
	    }
	}    
 	alert(JSON.stringify(tabs[c].title));

    chrome.windows.create({
        'url': 'window.html',
        'type' : "panel"
    })
});