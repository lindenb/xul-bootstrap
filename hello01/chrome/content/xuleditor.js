Components.utils.import("chrome://hello/content/js/hello.jsm") 

var XUL_NS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";

function XulEditor()
	{
	this.outwin = null;
	}

XulEditor.defaultXulWindow = "<?xml version=\"1.0\"?>"+
	"<?xml-stylesheet href=\"chrome://global/skin/\" type=\"text/css\"?>\n"+
	"<window width=\"300\" height=\"300\" xmlns=\""+XUL_NS+"\">\n</window>"
	;

XulEditor.prototype.init = function()
	{
	this.outwin = window.open(
		"chrome://hello/content/empty.xul","Window",
		"chrome,titlebar,toolbar,alwaysRaised,resizable,menubar"
		);
	};

XulEditor.prototype.dispose = function()
	{
	if(this.outwin!=null)
		{
		this.outwin.close();
		this.outwin=null;
		}
	};
	
XulEditor.prototype.onchange = function(evt)
	{
	if(this.outwin==null) return;
	try
		{
		var  outroot = this.outwin.document.documentElement;
		while(outroot.hasChildNodes())
			{
			outroot.removeChild(outroot.firstChild);
			}
		
		// https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
		var parser = new DOMParser();
		var dom = parser.parseFromString(evt.target.value, "text/xml");
		var root = dom.documentElement;
		if( root.localName=="parsererror")
			{
			hello.log("Error");
			return;
			}
		
		for(var c = root.firstChild; c!=null; c=c.nextSibling)
			{
			outroot.appendChild(  this.outwin.document.importNode(c,true) );
			}
		}
	catch(err)
		{
		hello.log(err);
		}
	};
XulEditor.prototype.insert = function(category)
	{
	if(this.outwin==null) return;
	var xmlstr=document.getElementById("xmlstr");
	var pos = xmlstr.selectionStart;
	var texttoinsert = "";
	if( category=="label")
		{
		texttoinsert = "<label value='ABCDEF'/>";
		}
	if( texttoinsert == "" ) return ;
    xmlstr.value = xmlstr.value.substr(0,pos)+ texttoinsert + xmlstr.value.substr(pos);
    xmlstr.selectionStart = xmlstr.selectionEnd = pos+texttoinsert.length;
	}

var xuleditor = new XulEditor();



