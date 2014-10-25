chrome.tabs.getAllInWindow(null, function(tabs){

    for (var i = 0; i < tabs.length; i++) {
    chrome.tabs.sendRequest(tabs[i].id, { action: "xxx" });                         
    }

 	
 	alert(JSON.stringify(tabs[5].title));
});

