// https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Using

this.EXPORTED_SYMBOLS = ["Hello", "foo"];

function foo() {
  return "foo";
}

var Hello = {
  name : "bar",
  size : 3,
  incr : function()
  	{
  	this.size++;
  	return this.size;
  	}
};


