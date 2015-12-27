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

function readLines()
	{
		        
var f2 = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
f2.initWithPath("/tmp/jeter.txt");

var fis = Components.classes["@mozilla.org/network/file-input-stream;1"]
                    .createInstance(Components.interfaces.nsIFileInputStream);
fis.init(f2,-1,-1,0);

var charset = /* Need to find out what the character encoding is. Using UTF-8 for this example: */ "UTF-8";
var is = Components.classes["@mozilla.org/intl/converter-input-stream;1"]
                   .createInstance(Components.interfaces.nsIConverterInputStream);
// This assumes that fis is the nsIInputStream you want to read from
is.init(fis, charset, 1024, 0xFFFD);
is.QueryInterface(Components.interfaces.nsIUnicharLineInputStream);

var lines = [];

if (is instanceof Components.interfaces.nsIUnicharLineInputStream) {
  var line = {};
  var cont;
  do {
    cont = is.readLine(line);

    // Now you can do something with line.value
    lines.push(line.value);
  } while (cont);

alert(lines.join("\n"));
}

}

function runBashCommand() {
	try {
    jsdump("start");
    var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
    file.initWithPath("/bin/bash");
    if (!file.exists()) {
	alert("file "+file+" doesn't exists");
        return;
	}
    var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
    process.init(file);
    var observeHandler = {
        observe: function(nsIProcess, event, data) {
            switch (event) {
		case "process-finished":
			alert("ok");
			readLines();
                    break;

                case "process-failed":
			alert("process failed");
                    break;
            }
        }
    };
    
    var args= ["-c","ls -la ~ > /tmp/jeter.txt"];
    process.runAsync(args, args.length,observeHandler,false);
	} catch(err)
	{
	jsdump(err);
	} 
}
