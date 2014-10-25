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
    // to search for the lrc file...start
    stored_files = ["Alarm+Me+-+Adakah+Kau+Lupa", "Eminem+-+Not+Afraid", "Jennifer+Lopez+-+Love+dont+cost+a+thing", "Eminem+-+Youre+Never+Over"];
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
    alert(search_array);

    name = search_file(search_array);
    alert(name);

    function getFileName(s) {
        return s.replace(/^.*[\\\/]/, '');
    }
    function search_file(s) {
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
        alert(count);
        var max = 0;
        for (var i = 0; i < count.length; i++) {
            if(count[i] > count[max]) {
                max = i;
                alert(max);
            }
        };
        alert(max);
        return stored_files[max];
    }
    //to search for the lrc file...end
    chrome.windows.create({
        'url': 'window.html',
        'type' : "panel"
    })
});
