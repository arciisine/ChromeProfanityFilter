window.onload = function() {
  // Set default values
  if (!localStorage.wordList) {
    localStorage.wordList = "asshole,bitch,cock,cunt,damn,fuck,piss,slut,shit,tits,whore";
  }

  // Handle Message Passing for localStorage
  chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
      port.postMessage({wordList: localStorage.wordList, replaceWith:localStorage.replaceWith });
    });
  });
}
