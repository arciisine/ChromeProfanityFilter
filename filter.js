(function() {
var cleanser = null;

// Parse the profanity list
function toFilterList(words) {
  return (typeof words === 'string' ? words.split('\n') : words).map(function(v) {
    return new RegExp(v.trim(), "gi" );
  });
}

// Remove the words from the document
function filterWords(options, node) {
  var res = document.evaluate(
    './/text()[normalize-space(.) != ""]',
    (node.target ? node.target : node) || document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  
  for (var i = 0; i < res.snapshotLength; i++) {
    var textNode = res.snapshotItem(i);
    options.filterList.forEach(function(re) {
      textNode.data = textNode.data.replace(re, options.replaceWith || '');
    });
  }
}

// Retrieve the localStorage from background page
var port = chrome.extension.connect({name: "getLocalStorage"});
port.postMessage({localStorage: "options"});
port.onMessage.addListener(function(msg) {
  if (msg.wordList.length > 0) {
    msg.filterList = toFilterList(msg.wordList);
    cleanser = filterWords.bind(null, msg); 
    cleanser(document);
    document.addEventListener('DOMNodeInserted', cleanser);
  } else if (cleanser) {
    document.removeEventListener('DOMNodeInserted', cleanser);
    cleanser = null;
  }
});
})();
