define(["jquery"],function(jquery) {
	function powerBrother() {
		$("body").append("<p>加载了力哥的Javascript</p>");
	}
	function afterinit() {
		$("body").append("<p>如果力哥的Javascript需要第二个加载方法的Demo</p>");
	} 
	//返回一个init的数组，这个数组包含了这个方法
	return {
		init:powerBrother,
		afterinit:afterinit
	}
})