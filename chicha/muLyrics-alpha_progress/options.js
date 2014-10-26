// Saves options to chrome.storage
function save_options() {
  var position = document.getElementById('position').value;
  var opacity = document.getElementById('opacity').value;
  var width = document.getElementById('width').value;
  var height = document.getElementById('height').value;
  var fontSize = document.getElementById('fontSize').value;
  chrome.storage.sync.set({
    position: position,
    opacity: opacity,
    width: width,
    height: height,
    fontSize: fontSize
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    position: "bottom",
    opacity: 0,
    width: "400px",
    height: "600px",
    fontSize: "13px"
  }, function(items) {
    document.getElementById('position').value = items.position;
    document.getElementById('opacity').value = items.opacity;
    document.getElementById('width').value = items.width;
    document.getElementById('height').value = items.height;
    document.getElementById('fontSize').value = items.fontSize;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);