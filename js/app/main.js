//配置页面加载模块参数
require.config({
	//添加加载异步加载CSS的插件
	map:{
		'*':{
			'css':'../lib/css.min'
		}
	},
	//配置Javascript文件映射路径
	paths: {
		modernizr	:"../lib/modernizr.custom",
		jquery		:"../lib/jquery.min",
		jay			:"jay"
	},
	shim: {//模块依赖关系 demo
		//'swiperscrollbar': {deps:['swiper']},
		//'swiper': {deps: ['jquery']},
		'jay': {deps: ['jquery']},
		//'jay'  : {deps: ['swiper','swiperscrollbar']}
	}
});

//配置页面加载模块
require(['modernizr'],function(modernizr) {
	!Modernizr.rgba?window.location="np.html":'';
});

require(
	[
		'jay'
	], 
	function (jquery,jay){
		$(function() {
			jayfunction();
		});
	}
);
//加载对应css模块
require([
	"css!../../css/style1",
	"css!../../css/style2"
]);
