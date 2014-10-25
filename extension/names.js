chrome.tabs.getAllInWindow(null, function(tabs){

	chrome.windows.create('window.html', {
    	'alwaysOnTop': true
	});

    for (var i = 0; i < tabs.length; i++) {
    chrome.tabs.sendRequest(tabs[i].id, { action: "xxx" });
    }

 	alert(JSON.stringify(tabs[0].title));
});