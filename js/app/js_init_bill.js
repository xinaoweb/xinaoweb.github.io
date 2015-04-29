define(["jquery"],function(jquery) {
	function bill() {
		$("body").append("<p>加载了比尔盖茨的Javascript</p>");
	}
	//返回一个init的数组，这个数组包含了这个方法
	return {
		init:bill
	}
})