function jsdump(str) {
  Components.classes['@mozilla.org/consoleservice;1']
            .getService(Components.interfaces.nsIConsoleService)
            .logStringMessage(str);
	}


/** load javascript modeule hello */
jsdump( Components.utils.import("chrome://hello/content/js/hello.jsm") );


function showMore() {
  document.getElementById("more-text").hidden = false;
}


