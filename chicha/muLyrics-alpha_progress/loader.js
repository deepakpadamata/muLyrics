var songLyric={};
var start, stop;
var key, value;
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
        alert("Put Youtube da");
    }
    else{
       alert(JSON.stringify(tabs[c].title));
    }

    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
            // LOG THE CONTENTS HERE
            var at = parseInt(request.content[request.content.search("ytp-time-current")+18]);
            var bt = parseInt(request.content[request.content.search("ytp-time-current")+20]);
            var c = parseInt(request.content[request.content.search("ytp-time-current")+21]);
            ct = at*60 + bt*10 + c;
            console.log(ct);
            str = txt;

            for (var i = 0; i <= str.length; i++) {
                ch = str[i];
                // console.log(ch);
                if(ch=="["){
                    // console.log(i);
                    if(i>0){
                        value = str.substring(stop+1,i);
                        songLyric[key] = value;
                        // console.log("value: "+key);
                    }
                    start=i;
                }
                else if(ch=="]"){
                    stop = i;
                    key = text2seconds(str.substring(start+1, stop));
                    // console.log(i);
                    // console.log("key: "+key+"@ ("+start+", "+stop+")");
                }
            };
            // console.log(songLyric);
            // document.getElementsByTagName("title")[0].innerHTML = songLyric[0];
            var allKeys = Object.keys(songLyric);
            // console.log(allKeys);
            var a,b,index,val;
            index=0;
            a = allKeys[index];
            b = allKeys[index+1];
            for (var k in songLyric) {
                if (k > ct-0.5 && k < ct + 0.5 && k!=0 && songLyric[k]!= "" && songLyric!=" "){
                    document.getElementsByTagName("title")[0].innerHTML = songLyric[k];
                }
            }
          });

    
    setInterval(function(){chrome.tabs.getSelected(null, function(tab) {
      // Now inject a script onto the page
        chrome.tabs.executeScript(tabs[c].id, {
           code: "chrome.extension.sendRequest({content: document.body.innerHTML}, function(response) { console.log('success'); });"
         }, function() { console.log('done'); });
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

        alert(correct_name);
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
        alert(fullname)
        req1.open("GET",fullname, true);
        req1.addEventListener("load", function(e) {
            txt = req1.responseText;
            // alert(txt);
        }, false)
        req1.send(null);
    }, false)
    req.send(null);

function getFileName(s) {
    return s.replace(/^.*[\\\/]/, '');
}
//find you tube end







//sample lyric, should be replaced by fetched lyric string
// str = "[ti:Let It Be Me] [ar:Jennifer Lopez] [al:A.K.A.] [offset:0] [00:00.40]Let It Be Me - Jennifer Lopez [00:17.05]If the day comes that you must leave [00:19.67] [00:21.12]Let me be the ground to your feet [00:24.22] [00:25.44]If the day comes that you feel weak [00:28.52] [00:29.62]Let me be the armor you need [00:32.72] [00:33.28]Oh, if you falling in love is a crime [00:37.06] [00:37.96]And the price to pay is my life [00:41.20] [00:41.72]Give me sword, bring all the knives [00:45.99]Hand me the gun, I will not run [00:49.75] [00:50.28]And when they spare everything [00:52.70]but my pride [00:54.22] [00:54.82]Don't you worry, boy, don't you cry [00:58.17] [00:58.68]But when they ask [01:00.78]Who was the one, who got you love [01:06.32] [01:07.18]Let it be me [01:09.52] [01:16.48]If you ever make your last breath [01:18.79] [01:20.43]Let me be the last word you say [01:23.51] [01:24.81]And if right comes, but you choose left [01:27.90] [01:29.05]I will be the first to forgive [01:32.56]Oh if heaven is a beautiful place [01:36.14] [01:37.23]But those gates don't have enough space [01:40.88]And they lock you out [01:42.53] [01:43.08]Spare you no flame [01:44.66] [01:45.29]I will come down [01:47.33]If they’re on my wings [01:48.74] [01:49.43]And when the angels call me a fool [01:53.25] [01:54.28]For giving all grace up for you [01:57.34] [01:58.00]I won’t look back [01:59.54] [02:00.12]But when they ask, who did you love [02:06.07] [02:06.61]Let it be me [02:09.39] [02:17.27]Let it be me [02:18.51]That you think of when everything [02:22.30]tells you to give it up [02:24.99] [02:25.57]Let it be me that will ankle your soul [02:31.02] [02:31.98]Until the clouds fall out of the sky [02:35.85] [02:36.61]And the snow fall out in July [02:39.82] [02:40.38]Let it be me that you think of [02:43.99] [02:44.58]Let it be me the one that you love [02:48.82]Until the flowers don't blow in May [02:52.65] [02:53.40]And forever until the days [02:56.63] [02:57.44]Let it be me [02:59.37]Let it be me [03:00.82] [03:01.39]The one that you love [03:04.97] [03:05.90]Let it be me [03:08.75] [03:15.17]Let it be me [03:16.31] [03:22.74]Let it be me [03:24.93]Let it be me [03:26.32] [03:26.88]Let it be me [03:28.29] [03:29.19]Let it be me [03:30.43] [03:31.75]oh Let it be me [03:33.72]";
// console.log(str);
// document.getElementById("pp").innerHTML = str;
str = txt;
console.log(str);
console.log(ct);

// for (var i = 0; i <= str.length; i++) {
// 	ch = str[i];
// 	// console.log(ch);
// 	if(ch=="["){
// 		// console.log(i);
// 		if(i>0){
// 			value = str.substring(stop+1,i);
// 			songLyric[key] = value;
// 			// console.log("value: "+key);
// 		}
// 		start=i;
// 	}
// 	else if(ch=="]"){
// 		stop = i;
// 		key = text2seconds(str.substring(start+1, stop));
// 		// console.log(i);
// 		// console.log("key: "+key+"@ ("+start+", "+stop+")");
// 	}
// };

// console.log(songLyric);
// document.getElementById("title").innerHTML = songLyric[0];
// document.getElementsByTagName("title")[0].innerHTML = songLyric[0];
// var allKeys = Object.keys(songLyric);
// // console.log(allKeys);
// var a,b,index,val;
// a = allKeys[0];
// b = allKeys[1];
// index=0;
// setInterval(
//     function(){
//         ct = document.getElementById("ap").currentTime; //should be replaced bytime from youtube
//         val  = songLyric[a];
//         if(ct>a-0.5 && val!=" " && a!=0){
//             document.getElementById("lyric").innerHTML = val;
//             // console.log(a+":"+val);
//             index++;
//             a=allKeys[index];
//             // b=allKeys[index+1];
//         }
//         else if(val==" " || a==0){
//             index++;
//             a=allKeys[index];
//         }
//     },1000
// );
function text2seconds (stringKey) {
	var sp = stringKey.indexOf(":");
	// console.log(stringKey.indexOf(":"));
	// var seconds = 2;
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
	// *60 + parseInt(sp.substring(sp,stringKey.length));
	// s = parseInt("2");
}
// setInterval(
// 	function(){
// 		ct = document.getElementById("ap").currentTime; //should be replaced bytime from youtube
// 		for (var k in songLyric) {
// 			if(k<ct+0.5 && k!=0 && songLyric[k]!=""){
// 				document.getElementById("lyric").innerHTML = songLyric[k];
// 			}
// 			// else{
// 			// 	// console.log(k);
// 			// }
// 		};
// 	},1000
// );






});