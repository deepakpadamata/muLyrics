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
    // chrome.windows.create({
    //     'url': 'window.html',
    //     'type' : "panel"
    // });
    var req = new XMLHttpRequest();
    req.open("GET", "/186041.lrc", true);
    req.addEventListener("load", function(e) {
        var txt = req.responseText;
        console.log(txt);
    }, false);
    req.send(null);
    // alert(txt);
    // document.getElementById("showLRC").innerHTML = txt;
    // chrome.pageCapture.saveAsMHTML(object details, function callback)
    // var sl = document.getElementById("lrc");
    // xmlDoc=loadXMLDoc("https://www.youtube.com/watch?v=P_WyB1Yunqw");
    // x=xmlDoc.getElementsByTagName("title")[0];
    // str = JSON.stringify(tabs[c].id);
    // sl.innerHTML = str;
    // console.log("--------"+x+"--------");
 	// console.log(JSON.stringify(tabs[c].innerHtml));
    // chrome.windows.create({
    //     'url': 'window.html',
    //     'type' : "panel"
    // })

});
