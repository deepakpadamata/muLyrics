var songLyric={};
var start, stop;
var key, value;
var errorMessage = "Lyrics not found";
//YouTube finding tab start
chrome.tabs.getAllInWindow(null, function(tabs){
	var c = -1;
    for (var i = 0; i < tabs.length; i++) {	
    	chrome.tabs.sendRequest(tabs[i].id, { action: "xxx" });
    	if((JSON.stringify(tabs[i].title).indexOf("YouTube")) > -1) {
    		c = i;		
    		break;
	    }
	}
    if (c == -1){
        // alert("Put Youtube da"); //not useful for now
    }
    else{
       console.log("YouTube tabname: "+JSON.stringify(tabs[c].title)); //not useful for now
    }

    oldct=0;
    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
        // LOG THE CONTENTS HERE
        var at = parseInt(request.content[request.content.search("ytp-time-current")+18]);
        var bt = parseInt(request.content[request.content.search("ytp-time-current")+20]);
        var c = parseInt(request.content[request.content.search("ytp-time-current")+21]);
        ct = at*60 + bt*10 + c;
        str = txt;
        // console.log("String lyric: "+str);
        if(str==errorMessage){
            songLyric[0] = errorMessage;
            document.getElementsByTagName("title")[0].innerHTML = songLyric[0];
        }
        var allKeys=[];
        for (var i = 0; i <= str.length; i++) {
            ch = str[i];
            if(ch=="["){
                if(i>0){
                    value = str.substring(stop+1,i);
                    songLyric[key] = value;
                    allKeys.push(key);
                }
                start=i;
            }
            else if(ch=="]"){
                stop = i;
                key = text2seconds(str.substring(start+1, stop));
            }
        };
        var save="",j=0;
        //for filling the empty values
        for (var i = 0; i < allKeys.length; i++) {
            if(songLyric[allKeys[i]]==""){
                for (j = i+1; j < allKeys.length; j++) {
                    if(songLyric[allKeys[j]]!=""){
                        save = songLyric[allKeys[j]];
                        break;
                    }
                };
                for (var k = i; k < j; k++) {
                    songLyric[allKeys[k]]=save;
                };
            }
        };
        var a,b,index,val;
        index=0;
        allKeys = Object.keys(songLyric);
        a = allKeys[index];
        b = allKeys[index+1];
        divContent = "";
        for (var k in songLyric) {
            if (k > ct-0.5 && k < ct + 0.5 && k!=0 && songLyric[k]!= "" && songLyric!=" "){
                document.getElementsByTagName("title")[0].innerHTML = songLyric[k];
            }
            else if(k > ct-0.5 && k < ct + 0.5){
                document.getElementsByTagName("title")[0].innerHTML = "...";
            }
            if(k > ct-0.5 && k < ct+0.5 && k!=0 && songLyric[k]!= "" && songLyric!=" "){
                divContent += "<span class='highlighted'>" + songLyric[k] + "</span>" + "<br><br>";
            }
            else{
                divContent += songLyric[k] + "<br><br>";
            }
        }
        document.getElementById("lyric").innerHTML = divContent;
        // var iScroll = $(window).scrollTop();
        // iScroll = iScroll + 32;
        // $('html, body').animate({
        //     scrollTop: iScroll
        // }, oldct - ct);
        // oldct = ct;
    });

    
    setInterval(function(){chrome.tabs.getSelected(null, function(tab) {
      // Now inject a script onto the page
        chrome.tabs.executeScript(tabs[c].id, {
           code: "chrome.extension.sendRequest({content: document.body.innerHTML}, function(response) { console.log('success'); });"
         }, function() { console.log('tick'); });
    })}, 1000);

    var req = new XMLHttpRequest();
    req.open("GET","lyric/list.txt", true);
    req.addEventListener("load", function(e) {
        var stored_files = req.responseText
        stored_files = stored_files.split("\n");
        // alert(stored_files);
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
        correct_name = correct_name.replace(/\[.*?\]/g,'');
        correct_name = correct_name.replace(/\(.*?\)/g,'');
        correct_name = correct_name.replace(/\[.*?\)/g,'');
        correct_name = correct_name.replace(/\(.*?\]/g,'');

        console.log("Trimmed: " + correct_name);
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
        console.log("Match-factor: "+count[max]);
        var req1 = new XMLHttpRequest();
        if(count[max]>0){
            fullname = "/lyric/" + stored_files[max]
            console.log("File Name: " + fullname)
            req1.open("GET",fullname, true);
            req1.addEventListener("load", function(e) {
                txt = req1.responseText;
                // alert(txt);
            }, false)
            req1.send(null);                    
        }
        else{
            txt = errorMessage;
            console.log("File Name: "+errorMessage);
        }
    }, false)
    req.send(null);

    function getFileName(s) {
        return s.replace(/^.*[\\\/]/, '');
    }
    function text2seconds (stringKey) {
    	var sp = stringKey.indexOf(":");
    	var mins, sec, tt;
    	mins = parseInt(stringKey.substring(0,sp));
    	if(sp===2 && mins!=NaN){
    		sec = parseInt(stringKey.substring(sp+1));
    		tt = mins*60 + sec;
    		return tt;
    	}
    	else{
    		return stringKey;
    	}
    }
});