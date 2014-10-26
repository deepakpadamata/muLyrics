chrome.tabs.getAllInWindow(null, function(tabs){

	chrome.windows.create({
		'url': 'window.html',
    	'type' : "panel"
	})

    for (var i = 0; i < tabs.length; i++) {
    	chrome.tabs.sendRequest(tabs[i].id, { action: "xxx" });
    }

 	alert(JSON.stringify(tabs[0].title));
});