//配置页面加载模块参数
require.config({
	//等待加载的时间
	waitSeconds:120,
	//添加加载异步加载CSS的插件
	map:{
		'*':{
			'css':'../lib/css.min'
		}
	},
	//配置Javascript文件映射路径
	paths: {
		modernizr	:"../lib/modernizr.custom",
		jquery		:["http://cdn.bootcss.com/jquery/2.1.3/jquery.min","../lib/jquery.min"],
		jay			:"jay"
	},
	shim: {//模块依赖关系 demo
		//'swiperscrollbar': {deps:['swiper']},
		//'swiper': {deps: ['jquery']},
		'jay': {deps: ['jquery','modernizr']},
		//'jay'  : {deps: ['swiper','swiperscrollbar']}
	}
});

//配置页面加载模块

require(
	[
		'jay'
	], 
	function (jquery,modernizr,jay){
		$(function() {
			jayfunction();
		});
	}
);
//加载对应css模块
require([
	"css!../../css/style1",
	"css!../../css/animations",
	"css!../../css/style2"
]);
