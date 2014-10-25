chrome.tabs.getAllInWindow(null, function(tabs){
    var c = -1;
    for (var i = 0; i < tabs.length; i++) { 
        chrome.tabs.sendRequest(tabs[i].id, { action: "xxx" });

        if((JSON.stringify(tabs[i].title).indexOf("YouTube")) > -1) {
            c= i;       
            break;
        }
        else
            alert("Put YouTube daa");
    }    
    // alert(JSON.stringify(tabs[c].title));

    // to search for the lrc file...start
    stored_files = ["Alarm+Me+-+Adakah+Kau+Lupa", "Eminem+-+Not+Afraid", "Jennifer+Lopez+-+Love+dont+cost+a+thing", "Eminem+-+Youre+Never+Over"];
    count = [];
    for (var i = 0; i < stored_files.length; i++) {
        count.push(-1);
    };
    console.log(count);

    title = JSON.stringify(tabs[c].title);

    search_name = getFileName(title);

    correct_name = title.replace(/\\/g, "");
    correct_name = correct_name.replace(' - YouTube', '');
    correct_name = correct_name.replace('-', '');
    correct_name = correct_name.replace(/"/g,"");
    correct_name = correct_name.replace("  ", " ");

    search_array = correct_name.split(" ");

    name = search_file(search_array);
    alert(name);

    function getFileName(s) {
        return s.replace(/^.*[\\\/]/, '');
    }
    function search_file(s) {
        for (var i = 0; i < search_array.length; i++) {
            for (var j = 0; j < stored_files.length; j++) {
                count[j] += stored_files[j].search(search_array[i]);
            };
        };
        for (var i = 0; i < count.length; i++) {
            var max = 0;
            if(count[i] > count[0]) {
                max = i;
            }
            else
                continue;
        };
        return stored_files[max];
    }
    //to search for the lrc file...end
    chrome.windows.create({
        'url': 'window.html',
        'type' : "panel"
    })
});


// "Train - \"Marry Me\" Stories as Told by Our Fans - YouTube" 
// " Stories as Told by Our Fans - YouTube" 

//     var req = new XMLHttpRequest();
//         req.open("GET", "/186041.lrc", true);
//         req.addEventListener("load", function(e) {
//             var txt = req.responseText
//             alert(txt);
//         }, false)
//         req.send(null);

// });
