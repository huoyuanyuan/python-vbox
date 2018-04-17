$(function(){

	var typeObj = {
		windows:[
			{
				val:"windows7_64",
				name:"windows7(64-bit)"
			},
			{
				val:"windows7_32",
				name:"windows7(32-bit)"
			},
		],
		liunx:[
			{
				val:"Ubuntu_64",
				name:"Ubuntu(64-bit)"
			},
			{
				val:"Ubuntu_32",
				name:"Ubuntu(32-bit)"
			},
		]
	}

	var start = {
		init:function(){
			this.addEvents();
			this.funcs.initSelect('windows')
		},
		addEvents:function(){
			var _self = this;
			$('#type').selectpicker({});
			$('#version').selectpicker({});

			$("#type").on("changed.bs.select",function(e){
				var val = $("#type").selectpicker("val")
				console.log(val)
			})
		},
		eventsHandles:{
			
		},
		funcs:{
			initSelect:function(type){
				var arr = typeObj[type];
				var html = ""
				for(var i=0;i<arr.lenght;i++){
					var baseHtml = '<option value="'+arr[i].val+'">'+arr[i].name+'</option>'
					html += baseHtml
				}
				$("#version").html(html);
				$("#version").selectpicker('refresh');
			},
			// 模板渲染方法 
            /**
            * tpl: 模板
            * data: 数据
            * 返回字符串
            */
            _render:function(tpl,data){
                var render = template.compile(tpl);
                var html = render(data);
                return html;
            },
            _ajax : function(data, urls, cb, fb){
                var ajax = { 
                    url: urls,
                    type: 'GET',
                    dataType: 'json', 
                    cache: false, 
                    traditional: true,
                    data: data,  
                    success: function(json, statusText) {   
                        cb&&cb(json); 
                    },
                    error:function(json){
                        
                    }
                }
                $.ajax(ajax); 
            },
		}
	}

	start.init()
})