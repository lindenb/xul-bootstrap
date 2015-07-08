// https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Using

this.EXPORTED_SYMBOLS = ["hello"];

function Hello()
	{
	this.mDBConn = null;
	}
	
Hello.prototype.zorg = function()
  	{
  	return 5;
  	};
  
Hello.prototype.my_num = 4;

Hello.prototype.my_incr = function()
  	{
  	this.my_num++;
  	return this.my_num;
  	};


Hello.prototype.zorg = function()
  	{
  	return 5;
  	};

Hello.prototype._trace = function(prefix,msg)
	{
	 Components.classes['@mozilla.org/consoleservice;1']
            .getService(Components.interfaces.nsIConsoleService)
            .logStringMessage("["+prefix+"]"+msg);
	};


Hello.prototype.log = function(msg)
	{
	this._trace("LOG",msg);
	};

Hello.prototype.debug = function(msg)
	{
	this._trace("DEBUG",msg);
	};

Hello.prototype.info = function(msg)
	{
	this._trace("INFO",msg);
	};

Hello.prototype.closeConnection = function()
	{
	if( this.mDBConn ==null ) return this;
	this.mDBConn.close();
	this.mDBConn=null;
	return this;
	}

Hello.prototype.openConnection = function()
	{
	if( this.mDBConn !=null ) return this;
		
	this.info("Opening SQL Database");
	/* see https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIProperties */
	 /* ProfD is a reference to the profile dir (ProfD) now. */
	 /* see https://developer.mozilla.org/en-US/Add-ons/Code_snippets/File_I_O for Here are some of the special locations the directory service supports: */
	var file = Components.classes["@mozilla.org/file/directory_service;1"]
                 .getService(Components.interfaces.nsIProperties)
                 .get("ProfD", Components.interfaces.nsIFile);
    file.append("hello.sqlite");
	var storageService = Components.classes["@mozilla.org/storage/service;1"]
		                    .getService(Components.interfaces.mozIStorageService);
	this.mDBConn = storageService.openDatabase(file);
	return this;
	}

Hello.prototype.getConnection = function()
	{
	this.openConnection();
  	return this.mDBConn;
	}


Hello.prototype.init = function()
	{
	this.openConnection();
	this.getConnection().executeSimpleSQL("create table if not exists tmp1(id int,name text)");
	}

Hello.prototype.dispose = function()
	{
	this.closeConnection();
	}


var hello = new Hello();


