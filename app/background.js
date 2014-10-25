chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html', {
    'bounds': {
      'width': 300,
      'height': 400,
    },
    'alwaysOnTop': true,
    frame: {type: "none"}
  });
});