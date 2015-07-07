Components.utils.import("chrome://hello/content/js/hello.jsm");

function jsdump(str) {
  Components.classes['@mozilla.org/consoleservice;1']
            .getService(Components.interfaces.nsIConsoleService)
            .logStringMessage(str);
	}

function showMore() {
  document.getElementById("more-text").hidden = false;
  jsdump("Hello!");
  jsdump(Hello.incr());
}


function testDatabase()
	{
	/* see https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIProperties */
	 /* ProfD is a reference to the profile dir (ProfD) now. */
	var file = Components.classes["@mozilla.org/file/directory_service;1"]
                     .getService(Components.interfaces.nsIProperties)
                     .get("ProfD", Components.interfaces.nsIFile);

	file.append("hello.sqlite");

	var storageService = Components.classes["@mozilla.org/storage/service;1"]
		                    .getService(Components.interfaces.mozIStorageService);
	var mDBConn = storageService.openDatabase(file);

	jsdump( mDBConn ) ;

	mDBConn.executeSimpleSQL("create table if not exists tmp1(id int,name text)");
	
	mDBConn.close();
	}
