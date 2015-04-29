var jayfunction = function() {
	//UI control
	var $doc,$win,$html,$body;
	
	$doc = $(document);
	
	(function tab() {
		var index = "";
		var $this;
		var $target = $(".toggle-tabs-001 > .tablayout");
		return $doc.on("click", ".subhead-tab-warp > .tabs", function(e) {
			$this = $(this);
			index = $this.index();
			$this.addClass("cur").siblings().removeClass("cur");
			$target.eq(index).addClass("cur").siblings().removeClass("cur");
		});
	})();
	
	
	if (typeof pageName != 'undefined' && pageName == "index") {
		require([
			"http://cdn.bootcss.com/Swiper/3.0.6/js/swiper.min.js",
			"css!http://cdn.bootcss.com/Swiper/3.0.6/css/swiper.min"
		],function(){
			
			
			var jsonDataRight = {};
			$doc.on("index_jsonload", function(e) {
				console.log(jsonDataRight)
				var $div = $("<div>");
				$.each(jsonDataRight, function(i,data){
					var _location = data.address;
					var _locationName = data.projectname;
					var _protype = data.industryclassname;
					var _pic =  (function() {
						var defimg = "images/loacationimg00.jpg"
						if (data.projectid == "1") {
							defimg = "images/loacationimg01.jpg"
						}
						if (data.projectid == "3") {
							defimg = "images/loacationimg02.jpg"
						}
						if (data.projectid == "4") {
							defimg = "images/loacationimg03.jpg"
						}
						return defimg
					})();
					
					
					var _m = 12,_y =2015
					
					var _buildingarea = data.buildingarea;
					var _supplyarea = data.supplyarea;
					
					var _refh = data.longitude;
					var _refv = data.latitude;
					
					
					//百度地图
					var point = new BMap.Point(_refh,_refv);  // 创建点坐标  
					var myIcon = new BMap.Icon("images/icon-location-1.png", new BMap.Size(69,102));
					var marker2 = new BMap.Marker(point,{icon:myIcon});  // 创建标注
					bdmap.addOverlay(marker2);     
					
					
					var template =
					'<a class="swiper-slide irhitemsheight" href="page1.html" refh="'+_refh+'" refv="'+_refv+'" >'+
					'	<div class="mapview-line-hov">'+
					'		<div class="mapview-line-cycle">'+
					'			<div class="icon-loaction"></div>'+
					'		</div>'+
					'		<div class="mv-local">'+_location+'</div>'+
					'		<div class="mv-localname">'+_locationName+'</div>'+
					'	</div>'+
					'	<div class="mapview-right-text-wrap">'+
					'		<div class="inner-cycle-top flexmid">'+
					'			<p>'+_buildingarea+' ㎡</p>'+
					'			<h2>建筑</h2>'+
					'		</div>'+
					'		<div class="inner-cycle-bot flexmid">'+
					'			<h2>供能</h2>'+
					'			<p>'+_supplyarea+' ㎡</p>'+
					'		</div>'+
					'		<span class="inner-text">'+
					'			<i class="it-line-hov"></i>'+
					'			<em>'+_protype+'</em>'+
					'		</span>'+
					'	</div>'+
					'	<div class="mapview-cycle-wrap">'+
					'		<div class="mapview-cycle"><img src="'+_pic+'" alt="">'+
					'			<div class="mpv-cycle-detail flexmid">'+
					'				<h3>二氧化碳排放总量 (kg)</h3>'+
					'				<p>21321321132231</p>'+
					'				<h3>成本总量 (rmb)</h3>'+
					'				<p>21321321132231</p>'+
					'				<h3>用电总量 (kwh)</h3>'+
					'				<p>21321321132231</p>'+
					'			</div>'+
					'		</div>'+
					'		<div class="mapview-cycle-tips">'+
					'			<div class="icon-si flexmid">'+
					'				<img src="images/icon-bulid-1.png" alt="">'+
					'			</div>'+
					'			<div class="text-date flexmid">'+
					'				<h2>'+_m+'</h2>'+
					'				<p>'+_y+'</p>'+
					'			</div>'+
					'		</div>'+
					'	</div>'+
					'</a>';
					$div.append(template);
					template = ""
				})
				
				$("#index_right_swiper .swiper-wrapper").html($div.html())
				$div = null;
				jsonDataRight = null;
				var INDEX_RIGHT_SWIPER = new Swiper("#index_right_swiper", {
					direction:"vertical",
					nextButton:"#slider_next",
					prevButton:"#slider_prew",
					mousewheelControl: true,
					slidesPerView: 3
				});


			})
			
			
			
			$.ajax({
				type : "get",
				async:false,
				url : "ajaxsample/gislist.js",
				dataType : "jsonp",
				jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
				jsonpCallback:"define",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
				success : function(json){
					jsonDataRight = json;
					$doc.trigger("index_jsonload")
				},
					error:function(){
					alert('加载数据失败');
				}
			});
		
			
			
			
			
			var INDEX_LEFT_SWIPER = new Swiper("#index_left_swiper", {
				slidesPerView: 1,
				slidesPerColumn: 3,
				paginationHide:false,
				mousewheelControl: true,
				paginationClickable: true,
				pagination:"#ils_pages"
			});
			
			
			
			
			
			$("#index_right_swiper").on("click", ".swiper-slide", function(e) {
				var $this = $(this);
				var _relh = $this.attr("refh");
				var _relv = $this.attr("refv");
				var point = new BMap.Point( Number(_relh),Number(_relv) );
//				console.log(point)
				bdmap.centerAndZoom(point,20);
				var _actclass = "mapview-active"
				if ( !$this.hasClass(_actclass) ){
					$this.addClass(_actclass).siblings().removeClass(_actclass);
					e.preventDefault();
				}
			});
			
		});
		
		/*var mapchartoption = {
			color:["#f3f8fe"],
			tooltip : {
				show:false,
				trigger: 'item',
        		showDelay: 0
			},
			series:[
				{
					
					type: 'map',
					mapType: 'china',
					roam: false,
					itemStyle:{
						normal:{
							color:["#f3f8fe"],	
							borderWidth:4,
							borderColor:"#7a8ea8",
							label:{
								show:true,
								textStyle: {
									fontWeight:'normal',
									fontSize:48
								}
							}
						},
						emphasis:{
							color:["#328dde"],
							label:{
								
								show:true
							}
						}
					},
					data:[]
				}
			]
		}
		var mapchart= echarts.init(document.getElementById('Amapcontent'));
		mapchart.setOption(mapchartoption)*/
		
	}//index end
	
	
	if (typeof pageName != 'undefined' && pageName == "page01") {
		require([
			"css!http://cdn.bootcss.com/bootstrap-datepicker/1.4.0/css/bootstrap-datepicker.standalone.min.css",
			"css!http://cdn.bootcss.com/bootstrap-datepicker/1.4.0/css/bootstrap-datepicker3.standalone.min.css",
			"http://cdn.bootcss.com/bootstrap-datepicker/1.4.0/js/bootstrap-datepicker.min.js"
		],function() {
			require([
			"http://cdn.bootcss.com/bootstrap-datepicker/1.4.0/locales/bootstrap-datepicker.zh-CN.min.js"],function(e) {
				$('.dateinput').datepicker({
					language:"zh-CN"
				});
			})
			
		});
//		alert(document.documentElement.clientWidth)
//		alert(document.documentElement.clientHeight)
		
		$doc.on("click", ".ctr-button", function() {
			$(".xa-bottom-layout").toggleClass("show")
		});
		
	} if (typeof pageName == 'undefined') {
		throw new Error('没有定义页面名称')
	}
	
	var $xa_modal_overlay = $(".xa-modal-overlay"),
		$xa_modal_wrapper = $(".xa-modal-wrapper");
		
	
	$doc.on("click", ".clsbtn", function(e) {
		$xa_modal_wrapper.on("animationend.ane webkitAnimationEnd.ane", function(e) {
			$xa_modal_wrapper.addClass("modal-hide");
			$xa_modal_wrapper.removeClass("modal-hidding");
			$doc.trigger("modalhide");
			$xa_modal_wrapper.off(".ane");
		});
		$xa_modal_wrapper.addClass("modal-hidding");
		$xa_modal_overlay.addClass("modal-overlay-hide");
	});
	
	function showModal(callback) {
		$xa_modal_wrapper.on("animationend.ane webkitAnimationEnd.ane", function() {
			$xa_modal_wrapper.removeClass("modal-showing");
			$doc.trigger("modalshow");
			if (typeof callback == "function") {
				callback();
			}
			$xa_modal_wrapper.off(".ane");
		});
		$xa_modal_wrapper.removeClass("modal-hide");
		$xa_modal_wrapper.addClass("modal-showing");
		$xa_modal_overlay.removeClass("modal-overlay-hide")
	}
	
	
	
	var $modalinnerChartWrap = $("#chartinner");
	var modalchartobj ;
	$doc.on("click", "#showModal_1", function() {
		modalchartobj = null;
		$modalinnerChartWrap[0].innerHTML= "";
		function show_1_callback() {
			console.log("show 1 call back");
			modalchartobj = echarts.init(document.getElementById('chartinner'), defaultTheme);
			modalchartobj.setOption(optionModal);
		}
		showModal(show_1_callback);
	}).on("click", "#showModal_2",function() {
		function show_2_callback() {
			console.log("show 1 call back")
		}
		showModal(show_2_callback);
	}).on("click", "#showModal_3",function() {
		function show_3_callback() {
			console.log("show 1 call back")
		}
		showModal(show_3_callback);
	}).on("click", "#showModal_4",function() {
		modalchartobj = null;
		$modalinnerChartWrap[0].innerHTML= "";
		function show_4_callback() {
			console.log("show 4 call back");
			modalchartobj = echarts.init(document.getElementById('chartinner'), defaultTheme);
			modalchartobj.setOption(optionModal2);
			
		}
		showModal(show_4_callback);
	}).on("click", "#showModal_5",function() {
		modalchartobj = null;
		$modalinnerChartWrap[0].innerHTML= "";
		var $span1 = $("<span>").html("成本能源结构图").css({
			"position":"absolute",
			"left":"1610px",
			"fontSize":"60px",
			"top":"90px"
		});
		var $span2 = $("<span>").html("收益能源结构图").css({
			"position":"absolute",
			"left":"2320px",
			"fontSize":"60px",
			"top":"90px"
		});
		function show_5_callback() {
			console.log("show 5 call back");
			modalchartobj = echarts.init(document.getElementById('chartinner'), defaultTheme);
			modalchartobj.setOption(optionModal3);
			
			console.log($span1,$span2)
			$modalinnerChartWrap.prepend( $("<div>").attr("id", "tempss").css("position", "relative") )
			$(document.getElementById("tempss")).prepend($span1)
			$(document.getElementById("tempss")).prepend($span2)
		}
		showModal(show_5_callback);
	}).on("click", "#showModal_6",function() {
		function show_6_callback() {
			console.log("show 1 call back")
		}
		showModal(show_6_callback);
	}).on("click", "#showModal_7",function() {
		function show_7_callback() {
			console.log("show 1 call back")
		}
		showModal(show_7_callback);
	}).on("click", "#showModal_8",function() {
		modalchartobj = null;
		$modalinnerChartWrap[0].innerHTML= "";
		var $span1 = $("<span>").html("成本能源结构图").css({
			"position":"absolute",
			"left":"1610px",
			"fontSize":"60px",
			"top":"90px"
		});
		var $span2 = $("<span>").html("收益能源结构图").css({
			"position":"absolute",
			"left":"2320px",
			"fontSize":"60px",
			"top":"90px"
		});
		function show_5_callback() {
			console.log("show 5 call back");
			modalchartobj = echarts.init(document.getElementById('chartinner'), defaultTheme);
			modalchartobj.setOption(optionModal3);
			
			console.log($span1,$span2)
			$modalinnerChartWrap.prepend( $("<div>").attr("id", "tempss").css("position", "relative") )
			$(document.getElementById("tempss")).prepend($span1)
			$(document.getElementById("tempss")).prepend($span2)
		}
		showModal(show_5_callback);
	}).on("click", "#showModal_9",function() {
		modalchartobj = null;
		$modalinnerChartWrap[0].innerHTML= "";
		var $span1 = $("<span>").html("成本能源结构图").css({
			"position":"absolute",
			"left":"1610px",
			"fontSize":"60px",
			"top":"90px"
		});
		var $span2 = $("<span>").html("收益能源结构图").css({
			"position":"absolute",
			"left":"2320px",
			"fontSize":"60px",
			"top":"90px"
		});
		function show_5_callback() {
			console.log("show 5 call back");
			modalchartobj = echarts.init(document.getElementById('chartinner'), defaultTheme);
			modalchartobj.setOption(optionModal3);
			
			console.log($span1,$span2)
			$modalinnerChartWrap.prepend( $("<div>").attr("id", "tempss").css("position", "relative") )
			$(document.getElementById("tempss")).prepend($span1)
			$(document.getElementById("tempss")).prepend($span2)
		}
		showModal(show_5_callback);
	}).on("click", "#showModal_10",function() {
		function show_10_callback() {
			console.log("show 1 call back")
		}
		showModal(show_10_callback);
	}).on("click", "#showModal_11",function() {
		function show_11_callback() {
			console.log("show 1 call back")
		}
		showModal(show_11_callback);
	}).on("click", "#showModal_12",function() {
		function show_12_callback() {
			console.log("show 1 call back")
		}
		showModal(show_12_callback);
	});
	
	
	//Charts
	if (typeof echarts == 'undefined' ) {
		return 
	} else {
	var defaultTheme = "macarons"; // 默认chart主题
	var myCharts = echarts.init(document.getElementById('pie1'), defaultTheme);
	var myCharts2 = echarts.init(document.getElementById('pie2'), defaultTheme);
	var myChartsPie3 = echarts.init(document.getElementById('pie3'), defaultTheme);
	var myChartsPie4 = echarts.init(document.getElementById('pie4'), defaultTheme);
	var myCharts3 = echarts.init(document.getElementById('barchart-1'), defaultTheme);
	var myCharts4 = echarts.init(document.getElementById('barchart-2'), defaultTheme);
	var mycolumnChart3 = echarts.init(document.getElementById('columnChart3'), defaultTheme);
	var mycolumnChart4 = echarts.init(document.getElementById('columnChart4'), defaultTheme);
	var mycolumnChart5 = echarts.init(document.getElementById('columnChart5'), defaultTheme);
//	var myModalChart = echarts.init(document.getElementById('chartinner'), defaultTheme);
	var radius = [130,160];
	var labelTop = {
		normal : {
			label : {
				show : true,
				position : 'center',
				formatter : '{b}',
				textStyle: {
					fontSize:48,
					baseline : 'bottom'
				}
			},
			labelLine : {
				show : false
			}
		}
	};
	var labelFromatter = {
		normal : {
			label : {
				formatter : function (params){
					return 100 - params.value + '%';
				},
				textStyle: {
					fontWeight:'bold',
					fontSize:36,
					baseline : 'top'
				}
			}
		},
	};
	var labelBottom = {
		normal : {
			color: '#ccc',
			label : {
				show : true,
				position : 'center'
			},
			labelLine : {
				show : false
			}
		},
		emphasis: {
			color: 'rgba(0,0,0,0)'
		}
	};
	
	var animationDurationAll = 300;
	
	var optionsPie1 = {
		animationDuration: animationDurationAll,
		color : ['#faaf3b'],
		series : [
			{
				type : 'pie',
				center : ['50%', '50%'],
				radius : radius,
				x: '0%', // for funnel
				itemStyle : labelFromatter,
				data : [
					{name:'', value: 30, itemStyle : labelBottom},
					{name:'节能率', value: 70,itemStyle : labelTop}
				]
			}
		]
	};
	var optionsPie2 = {
		animationDuration: animationDurationAll,
		color : [ '#22b473'],
		series : [
			{
				type : 'pie',
				center : ['50%', '50%'],
				radius : radius,
				x: '0%', // for funnel
				itemStyle : labelFromatter,
				data : [
					{name:'', value:60, itemStyle : labelBottom},
					{name:'CO2减排率', value:40,itemStyle : labelTop}
				]
			}
		]
	};
	
	
	
	var optionsbar1 = {
		animationDuration: animationDurationAll,
		backgroundColor: "#fff",
		calculable: false,
		grid: {
			borderWidth:0,
			x: 30,
			x2: 30,
			y: 60,
			y2: 60
		},
		xAxis: [
			{
				splitLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#989898',
						fontWeight: 'bolder',
						fontSize: 30
					}
				},
				type: 'category',
				show: true,
				data: ['当前能耗', '常规能耗'],
			}
		],
		yAxis: [
			{
				
				type: 'value',
				show: false
			}
		],
		series: [
			{
				name: 'xx',
				type: 'bar',
				barWidth : 42,
				itemStyle: {
					normal: {
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							  '#faaf3b','#B5C334','#FCCE10','#E87C25','#27727B',
							   '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
							   '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
							];
							return '#faaf3b';
						},
						label: {
							textStyle:{
								fontSize:24
							},
							show: true,
							position: 'top',
							formatter: function(params) {
								var html = params.value + "\n" + "标煤(t)";
								return html;
							} 
						}
					}
				},
				data: [25406,16406]
			},
			
		]

	};
	
	var columnChartopt = {
		grid:{
			x:"100px",
			x0:"10px"
		},
		legend: {
			x:"right",
			data:['当年成本','当年收益']
		},
		xAxis : [
			{
				axisLine:{
					lineStyle:{
						color: '#989898'
					}
				},
				axisLabel:{
					textStyle:{
						color: '#989898',
						fontWeight: 'bolder',
						fontSize: 24
					}
				},
				type : 'category',
				data : [2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015]
			}
		],
		yAxis : [
			{
				type : 'value',
				axisLine:{
					lineStyle:{
						color: '#989898'
					}
				},
				axisLabel:{
					textStyle:{
						color: '#989898',
						fontWeight: 'bolder',
						fontSize: 24
					}
				}
			}
		],
		series:[
			{
				name:"当年成本",
				type:'bar',
				barWidth : 20,
				barCategoryGap:'40%',
				itemStyle : 
				{
					normal: {
						color: '#22b473',
						borderRadius: 5,
						label : {
							show: false,
							position: 'left',
							formatter: '{b}'
						}
					}
				},
				data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
			},
			{
				name:"当年收益",
				type:"bar",
				barWidth : 20,
				barCategoryGap:'40%',
				itemStyle : { 
					normal: 
					{
						color: '#00a89c',
						borderRadius: 5,
						label : {
							show: false,
							position: 'left',
							formatter: '{b}'
						}
					}
				},
				data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
			}
		]
	};
	
	
		
		
		
	var optionModal = {
		animationDuration: animationDurationAll,
		color:["#55b6d8", "#2bbaba", "#1c7099", "#038cc4"],
		title : {
			show:false
		},
		tooltip : {
			trigger: 'axis'
		},
		legend: {
			show:false,
			data:['意向','预购','成交']
		},
		toolbox: {
			show : false,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false},
				magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		grid:{
			x2:"50%"
		},
		calculable : false,
		xAxis : [
			{
				type : 'category',
				boundaryGap : false,
				data : ['2009','2010','2011','2012','2013','2014','2015'],
				axisLabel:{
					textStyle:{
						fontSize:40
					}	
				}
			}
		],
		yAxis : [
			{
				type : 'value',
				axisLabel:{
					textStyle:{
						fontSize:40
					}	
				}
				
			}
		],
		series : [
			{
				name:'成交',
				type:'line',
				smooth:true,
				itemStyle: {normal: {areaStyle: {type: 'default'}}},
				data:[10, 12, 21, 54, 260, 830, 710]
			},
			{
				name:'预购',
				type:'line',
				smooth:true,
				itemStyle: {normal: {areaStyle: {type: 'default'}}},
				data:[30, 182, 434, 791, 390, 30, 10]
			},
			{
				name:'意向',
				type:'line',
				smooth:true,
				itemStyle: {normal: {areaStyle: {type: 'default'}}},
				data:[1320, 1132, 601, 234, 120, 90, 20]
			},
			{
				calculable : true,
				name:'意向',
				type:'pie',
				roseType : 'area',
				center: (function() {
					var half = 2908/2
					var k = [half*1.5, "50%"]
					return k
				})(),
				radius :[120, (function() {
					return 995/2 - 180
				})()],
				itemStyle :　{
					normal : {
						label:{
							 formatter :function (params){
								//  console.log(params)
									return params.name + '\n' + (params.percent + '%')
								},
							textStyle:{
								fontSize:40
							}
						},
						labelLine : {
							lineStyle:{
								width:4
							},
							length : 50
						}
					}
				},
				data:[
					{value:748, name:'土壤源热泵机组'},
					{value:451, name:'冷温水循环泵'},
					{value:247, name:'冷温水循环泵2'},
					{value:502, name:'其他'}
				]
			}
		]
	};

	var optionModal2itemsty = {
		normal:{
			lineStyle:{
				width:10
			},
			
		}
	}	
	var optionModal2 = {
		animationDuration: animationDurationAll,
		color:["#f6921e","#f05a24", "#ec1c24", "#c0272d"],
		tooltip : {
			show:false,
			trigger: 'axis'
		},
		legend: {
			itemWidth:80,
			itemHeight:40,
			textStyle:{
				fontSize:40
			},
			data:['供电','供热','供热水','供蒸汽']
		},
		toolbox: {
			show : false,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false},
				magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : false,
		xAxis : [
			{
				type : 'category',
				boundaryGap : false,
				axisLabel:{
					textStyle:{
						fontSize:40
					}	
				},
				data : ['周一','周二','周三','周四','周五','周六','周日']
			}
		],
		yAxis : [
			{
				axisLabel:{
					textStyle:{
						fontSize:40
					}	
				},
				type : 'value'
			}
		],
		series : [
			{
				name:'供电',
				type:'line',
				symbolSize:10,
				stack: '总量',
				itemStyle:optionModal2itemsty,
				data:[120, 132, 101, 134, 90, 230, 210]
			},
			{
				name:'供热',
				type:'line',
				symbolSize:10,
				stack: '总量',
				itemStyle:optionModal2itemsty,
				data:[220, 182, 191, 234, 290, 330, 310]
			},
			{
				name:'供热水',
				type:'line',
				symbolSize:10,
				stack: '总量',
				itemStyle:optionModal2itemsty,
				data:[150, 232, 201, 154, 190, 330, 410]
			},
			{
				name:'供蒸汽',
				type:'line',
				symbolSize:10,
				stack: '总量',
				itemStyle:optionModal2itemsty,
				data:[320, 332, 301, 334, 390, 330, 320]
			}
		]
	};	

		
	var optionModal3 = {
		animationDuration: animationDurationAll,
		color:["#55b6d8", "#2bbaba", "#1c7099", "#038cc4"],
		title : {
			show:false
		},
		tooltip : {
			trigger: 'axis'
		},
		legend: {
			x:"45%",
			data:['当年成本','当年收益']
		},
		toolbox: {
			show : false,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false},
				magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		grid:{
			y:200,
			y2:200,
			x2:"50%"
		},
		calculable : false,
		xAxis : [
			{
				axisLine:{
					lineStyle:{
						color: '#989898'
					}
				},
				axisLabel:{
					textStyle:{
						color: '#989898',
						fontWeight: 'bolder',
						fontSize: 24
					}
				},
				type : 'category',
				data : [2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015]
			}
		],
		yAxis : [
			{
				type : 'value',
				axisLine:{
					lineStyle:{
						color: '#989898'
					}
				},
				axisLabel:{
					textStyle:{
						color: '#989898',
						fontWeight: 'bolder',
						fontSize: 24
					}
				}
			}
		],
		series : [
			{
				name:"当年成本",
				type:'bar',
				barWidth : 20,
				barCategoryGap:'40%',
				itemStyle : 
				{
					normal: {
						color: '#22b473',
						borderRadius: 5,
						label : {
							show: false,
							position: 'left',
							formatter: '{b}'
						}
					}
				},
				data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
			},
			{
				name:"当年收益",
				type:"bar",
				barWidth : 20,
				barCategoryGap:'40%',
				itemStyle : { 
					normal: 
					{
						color: '#00a89c',
						borderRadius: 5,
						label : {
							show: false,
							position: 'left',
							formatter: '{b}'
						}
					}
				},
				data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
			},
			{
				calculable : false,
				name:'意向',
				type:'pie',
				roseType : 'area',
				center: (function() {
					var half = 2908/2
					var k = [half*1.5, "50%"]
					return k
				})(),
				radius :[120, (function() {
					return 995/2 - 180
				})()],
				itemStyle :　{
					normal : {
						label:{
							show:false,
							 formatter :function (params){
								//  console.log(params)
									return params.name + '\n' + (params.percent + '%')
								},
							textStyle:{
								fontSize:40
							}
						},
						labelLine : {
							show:false,
							lineStyle:{
								width:4
							},
							length : 50
						}
					}
				},
				data:[
					{value:748, name:'土壤源热泵机组'},
					{value:451, name:'冷温水循环泵'},
					{value:247, name:'冷温水循环泵2'},
					{value:502, name:'其他'}
				]
			},
			{
				calculable : false,
				name:'意向',
				type:'pie',
				roseType : 'area',
				center: (function() {
					var half = 2908/2
					var k = [half*1.5, "50%"]
					return k
				})(),
				radius :[120, (function() {
					return 995/2 - 180
				})()],
				itemStyle :　{
					normal : {
						label:{
							show:false,
							 formatter :function (params){
								//  console.log(params)
									return params.name + '\n' + (params.percent + '%')
								},
							textStyle:{
								fontSize:40
							}
						},
						labelLine : {
							show:false,
							lineStyle:{
								width:4
							},
							length : 50
						}
					}
				},
				data:[
					{value:748, name:'土壤源热泵机组'},
					{value:451, name:'冷温水循环泵'},
					{value:247, name:'冷温水循环泵2'},
					{value:502, name:'其他'}
				]
			}
		]
	};	
		
		
		
		
	
	
	myCharts.setOption(optionsPie1);
	myCharts2.setOption(optionsPie2);
	myCharts3.setOption(optionsbar1);
	var optionsbar2 = optionsbar1;
	optionsbar2.series[0].itemStyle.normal.color = "#22b473";
	optionsbar2.series[0].itemStyle.normal.label.formatter = function(params) {
		return params.value + "\n" + "标煤(kg)";
	};
	optionsbar2.series[0].data = [5406,16406];
	optionsbar2.xAxis[0].data = ["常规碳排放","常规能耗"];
	myCharts4.setOption(optionsbar2);
	
	
	var optionsPie3 = optionsPie1;
	var value = 75;
	var secValue = 100 - 75;
	optionsPie3.color = ["#ec1e79"];
	optionsPie3.series[0].data[0].value = secValue;
	optionsPie3.series[0].data[1].value = value;
	optionsPie3.series[0].data[1].name = "系统能效";
	myChartsPie3.setOption(optionsPie3);
	
	var optionsPie4 = optionsPie1;
	value = 15;
	secValue = 100 - value;
	optionsPie4.color = ["#92278e"];
	optionsPie4.series[0].data[0].value = secValue;
	optionsPie4.series[0].data[1].value = value;
	optionsPie4.series[0].data[1].name = "可再生能源\n利用率";
	optionsPie4.series[0].data[1].itemStyle.normal.label.textStyle.fontSize =36;
	myChartsPie4.setOption(optionsPie4);
	
	
	
	mycolumnChart4.setOption(columnChartopt);
	//示例加载数据
	var columnChartopt5 = columnChartopt;
	columnChartopt.series[0].data = [1230, 1233, 3412, 2000, 111, 575, 4777, 3547, 554, 500, 900, 200];
	columnChartopt.series[1].data = [1000, 2233, 1412, 1000, 311, 275, 2377, 1547, 254, 100, 700, 100];
	mycolumnChart5.setOption(columnChartopt5);
	
	//判断echart undefined end
//			modalchartobj = echarts.init(document.getElementById('chartinner'), defaultTheme);
//			modalchartobj.setOption(optionModal3);
	$doc.on("tab01chartjsonloadM", function(e) {
		console.log(tab01chartjsonM);
		$("#cou_01").html("￥ "+tab01chartjsonM[0].costsum);
		$("#cou_02").html("￥ "+tab01chartjsonM[0].incomesum);
		var dates1 = [];
		var dates2 = [];
		var dateX = [];
		var columnChartoptInit = columnChartopt;
		$.each(tab01chartjsonM[0].costdatas, function(i, d) {
			dates1[i] = d.data;
			dateX[i] = d.rectime;
		})
		$.each(tab01chartjsonM[0].incomedatas, function(i, d) {
			dates2[i] = d.data;
		})
		columnChartoptInit.xAxis[0].data = dateX;
		columnChartoptInit.series[0].data = dates1;
		columnChartoptInit.series[1].data = dates2;
		mycolumnChart4.setOption(columnChartoptInit);

	}).on("tab01chartjsonloadD", function(e) {
		console.log(tab01chartjsonD);
		$("#cou_03").html("￥ "+tab01chartjsonD[0].costsum);
		$("#cou_04").html("￥ "+tab01chartjsonD[0].incomesum);
		var dates1 = [];
		var dates2 = [];
		var dateX = [];
		var columnChartoptInit = columnChartopt;
		$.each(tab01chartjsonD[0].costdatas, function(i, d) {
			dates1[i] = d.data;
			dateX[i] = d.rectime;
		})
		$.each(tab01chartjsonD[0].incomedatas, function(i, d) {
			dates2[i] = d.data;
		})
		columnChartoptInit.xAxis[0].data = dateX;
		columnChartoptInit.series[0].data = dates1;
		columnChartoptInit.series[1].data = dates2;
		mycolumnChart5.setOption(columnChartoptInit);
	}).on("tab01chartjsonloadY", function(e) {
		console.log(tab01chartjsonY);
		$("#cou_05").html("￥ "+tab01chartjsonY[0].costsum);
		$("#cou_06").html("￥ "+tab01chartjsonY[0].incomesum);
		var dates1 = [];
		var dates2 = [];
		var dateX = [];
		var columnChartoptInit = columnChartopt;
		$.each(tab01chartjsonY[0].costdatas, function(i, d) {
			dates1[i] = d.data;
			dateX[i] = d.rectime;
		})
		$.each(tab01chartjsonY[0].incomedatas, function(i, d) {
			dates2[i] = d.data;
		})
		columnChartoptInit.xAxis[0].data = dateX;
		columnChartoptInit.series[0].data = dates1;
		columnChartoptInit.series[1].data = dates2;
		mycolumnChart3.setOption(columnChartoptInit);
	});
	var tab01chartjsonM = {};
	$.ajax({
		type : "get",
		async:false,
		url : "ajaxsample/costsumM.js",
		dataType : "jsonp",
		jsonp: "callback",
		jsonpCallback:"costsumM",
		success : function(json){
			tab01chartjsonM = json;
			$doc.trigger("tab01chartjsonloadM")
		},
			error:function(){
			alert('加载图表01数据失败');
		}
	});
	var tab01chartjsonD = {};
	$.ajax({
		type : "get",
		async:false,
		url : "ajaxsample/costsumD.js",
		dataType : "jsonp",
		jsonp: "callback",
		jsonpCallback:"costsumD",
		success : function(json){
			tab01chartjsonD = json;
			$doc.trigger("tab01chartjsonloadD")
		},
			error:function(){
			alert('加载图表01数据失败');
		}
	});		

	
	var tab01chartjsonY = {};
	$.ajax({
		type : "get",
		async:false,
		url : "ajaxsample/costsumY.js",
		dataType : "jsonp",
		jsonp: "callback",
		jsonpCallback:"costsumY",
		success : function(json){
			tab01chartjsonY = json;
			$doc.trigger("tab01chartjsonloadY")
		},
			error:function(){
			alert('加载图表01数据失败');
		}
	});		
		
		
	}
	
	
	
	
	//RecvMsgFormUnity();
		function RecvMsgFormUnity(str, callback)
		{
            $.ajax({
                url: 'test.json'
              , type: 'GET'
            }).done(function(data){
                console.log(data.labeldata[1].datavalue)
                var d = JSON.stringify(data)
                u.getUnity().SendMessage("AnchorPoint", "RecvMessage",d);
            });
		}
		
			var config = {
				width: 3100, 
				height: 2180,
				params: { enableDebugging:"0" }
				
			};
			var u = new UnityObject2(config);

			jQuery(function() {

				var $missingScreen = jQuery("#unityPlayer").find(".missing");
				var $brokenScreen = jQuery("#unityPlayer").find(".broken");
				$missingScreen.hide();
				$brokenScreen.hide();
				
				u.observeProgress(function (progress) {
					switch(progress.pluginStatus) {
						case "broken":
							$brokenScreen.find("a").click(function (e) {
								e.stopPropagation();
								e.preventDefault();
								u.installPlugin();
								return false;
							});
							$brokenScreen.show();
						break;
						case "missing":
							$missingScreen.find("a").click(function (e) {
								e.stopPropagation();
								e.preventDefault();
								u.installPlugin();
								return false;
							});
							$missingScreen.show();
						break;
						case "installed":
							$missingScreen.remove();
						break;
						case "first":
						break;
					}
				});
                $('.change3D').on('click', function(){
                    var n = $(this).data('num')
                    if(n == 1) u.initPlugin(jQuery("#unityPlayer")[0], "TestWeb1.unity3d");
                    else u.initPlugin(jQuery("#unityPlayer")[0], "TestWeb.unity3d");
                }); 
                    u.initPlugin(jQuery("#unityPlayer")[0], "TestWeb1.unity3d");
			});
};
       