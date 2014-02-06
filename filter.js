(function() {
var wordList;
var replaceWith;
var profanityList;

// Retrieve the localStorage from background page
var port = chrome.extension.connect({name: "getLocalStorage"});
port.postMessage({localStorage: "options"});
port.onMessage.addListener(function(msg) {
  wordList = msg.wordList.split(",");
  replaceWith = msg.replaceWith;

  if (wordList.length> 0) {
    generateProfanityList();
    removeProfanity();
  }
});

// When DOM is modified, remove profanity from inserted node
document.addEventListener('DOMNodeInserted', function(e) {
  removeProfanity(e.target);
}, false);

// Parse the profanity list
function generateProfanityList() {
  profanityList = wordList.map(function(v) {
    return new RegExp("\\b" + v + "\\b", "gi" );
  });
}

// Remove the profanity from the document
function removeProfanity(node) {
  if (!profanityList) return;

  var evalResult = document.evaluate(
    './/text()[normalize-space(.) != ""]',
    node || document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  
  for (var i = 0; i < evalResult.snapshotLength; i++) {
    var textNode = evalResult.snapshotItem(i);
    profanityList.forEach(function(re) {
      textNode.data = textNode.data.replace(re, replaceWith || '');
    });
  }
}
})();
