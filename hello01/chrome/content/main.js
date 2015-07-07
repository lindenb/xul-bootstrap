function jsdump(str) {
  Components.classes['@mozilla.org/consoleservice;1']
            .getService(Components.interfaces.nsIConsoleService)
            .logStringMessage(str);
	}

function showMore() {
  document.getElementById("more-text").hidden = false;
  jsdump("Hello!");
}


