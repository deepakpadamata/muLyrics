//YouTube finding tab
chrome.tabs.getAllInWindow(null, function(tabs){
	var c = -1;
    for (var i = 0; i < tabs.length; i++) {	
    	chrome.tabs.sendRequest(tabs[i].id, { action: "xxx" });
    	if((JSON.stringify(tabs[i].title).indexOf("YouTube")) > -1)
    		{
    			c = i;		
    			break;
	    	}
	}
    if (c == -1){
        alert("Put Youtube da")
    }
    else{
       alert(JSON.stringify(tabs[c].title));
    }
//Youtube Parser
    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
            // LOG THE CONTENTS HERE
            console.log(request.content[request.content.search("ytp-time-current")+18]);
            console.log(request.content[request.content.search("ytp-time-current")+20]);
            console.log(request.content[request.content.search("ytp-time-current")+21]);
          });

    
    setInterval(function(){chrome.tabs.getSelected(null, function(tab) {
      // Now inject a script onto the page
        chrome.tabs.executeScript(tabs[c].id, {
           code: "chrome.extension.sendRequest({content: document.body.innerHTML}, function(response) { console.log('success'); });"
         }, function() { console.log('done'); });
    })}, 1000);


// to search for the lrc file...start
    var req = new XMLHttpRequest();
    req.open("GET","lyric/list.txt", true);
    req.addEventListener("load", function(e) {
        var stored_files = req.responseText
        stored_files = stored_files.split("\n");
        count = [];
        for (var i = 0; i < stored_files.length; i++) {
            count.push(0);
        };

        title = JSON.stringify(tabs[c].title);

        search_name = getFileName(title);

        correct_name = title.replace(/\\/g, "");
        correct_name = correct_name.replace(' - YouTube', '');
        correct_name = correct_name.replace('-', '');
        correct_name = correct_name.replace(/"/g,"");
        correct_name = correct_name.replace("  ", " ");

        search_array = correct_name.split(" ");
        // alert(search_array);

        for (var i = 0; i < search_array.length; i++) {
            for (var j = 0; j < stored_files.length; j++) {
                if (stored_files[j].search(search_array[i]) == -1){
                    continue;
                }
                else{
                    count[j] += 1;
                }
            };
        };
        var max = 0;
        for (var i = 0; i < count.length; i++) {
            if(count[i] > count[max]) {
                max = i;
            }
        };
        // alert(stored_files[max]);
        var req1 = new XMLHttpRequest();
        fullname = "/lyric/" + stored_files[max]
        // alert(fullname)
        req1.open("GET",fullname, true);
        req1.addEventListener("load", function(e) {
            var txt = req1.responseText;
            alert(txt);
        }, false)
        req1.send(null);
    }, false)
    req.send(null);

    function getFileName(s) {
        return s.replace(/^.*[\\\/]/, '');
    }
});