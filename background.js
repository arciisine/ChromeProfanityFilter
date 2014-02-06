window.onload = function() {
  // Handle Message Passing for localStorage
  chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
      port.postMessage({wordList: localStorage.wordList, replaceWith:localStorage.replaceWith });
    });
  });
}
