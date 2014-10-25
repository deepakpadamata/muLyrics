var activeTab;

chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {

     // since only one tab should be active and in the current window at once
     // the return variable should only have one entry
     var activeTab = arrayOfTabs[0];
     var activeTabId = arrayOfTabs[0].id; // or do whatever you need

     var j = JSON.stringify(activeTab);
     
     // alert(JSON.stringify(activeTab));
     alert(j);	
  });
