(function() {

var options = {
   wordList : '',
   replaceWith : '*****'
};

function byId(id) { return document.getElementById(id); }
function show(id, on) { byId(id).style.display = on ? 'block' : 'none'; }

function onClick(id, fn) {
  byId(id).addEventListener('click', 
    function(e) {
      e.preventDefault();
      e.stopPropagation();
      fn(e);
      return false;
    }, false);
}

function sync(out, k) {
  var f = document.forms.options[k];
  if (out) {
    localStorage[k] = f.value || options[k];
  } else {
    f.value = localStorage[k] || options[k];
  }
}

function syncAll(out) {
  Object.keys(options).forEach(sync.bind(null, out));
}

window.onload = function() {
  onClick('save', syncAll.bind(null, true));
  onClick('close', window.close);
  onClick('modify-list', function() {
    show("profanity-list", true);
    show("modify-list-container", false);
  });
  syncAll();
}

})();
