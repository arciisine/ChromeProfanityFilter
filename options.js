(function() {
var website = "https://chrome.google.com/extensions/detail/ackkocjhcalcpgpfjcoinogdejibgbho";

function cancelEvent(fn) {
  return function(e) {
    e.preventDefault();
    e.stopPropagation();
    fn(e);
    return false;
  }
}

window.onload = function() {
   document.getElementById('save').addEventListener('click', cancelEvent(saveOptions), false);
   document.getElementById('close').addEventListener('click', cancelEvent(close), false);
   document.getElementById('visit-website').addEventListener('click', cancelEvent(openWebsite), false);
   document.getElementById('modify-list').addEventListener('click', cancelEvent(toggleProfanity), false);
   restoreOptions();
}

// Saves options to localStorage.
function saveOptions() {
  localStorage.wordList = document.forms.options.wordList.value;
  localStorage.replaceWith = document.forms.options.replaceWith.value;
}

function close() {
   restoreOptions();
   window.close();
}

// Restores form state to saved values from localStorage.
function restoreOptions() {
  document.forms.options.wordList.value = localStorage.wordList;
  document.forms.options.replaceWith.value = localStorage.replaceWith === undefined ? '*****' : localStorage.replaceWith;
}

// Opens the official website in a new tab
function openWebsite() {
  chrome.tabs.create({url: website});
}

// Displays the profanity list and hides the profanity button
function toggleProfanity() {
  document.getElementById("profanity-list").style.display = 'block';
  document.getElementById("modify-list-container").style.display = 'none';
}
})();
