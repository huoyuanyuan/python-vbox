$(function(){

	var typeObj = {
		windows:[
			{
				val:"windows7_64",
				name:"windows7(64-bit)"
			},
			{
				val:"windows8_64",
				name:"windows8(64-bit)"
			},
		],
		liunx:[
			{
				val:"Ubuntu_64",
				name:"Ubuntu(64-bit)"
			},
			{
				val:"RedHat_64",
				name:"RedHat(64-bit)"
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
				start.funcs.initSelect(val)
			})

			$("#name").on("input propertychange",function(){
				var $Dom = $(".jSubmit")
				var val = $("#name").val()
				if(val.length > 0){
					$Dom.removeClass("disabled")
				}else{
					$Dom.addClass("disabled")
				}
			})

			// 提交
			$(document).on("click",".jSubmit",function(){
				_self.eventsHandles.submit($(this));
			})
		},
		eventsHandles:{
			submit:function(currentItem){
				if(currentItem.hasClass("disabled")){
					return
				}
				currentItem.addClass("disabled")
				var name = $("#name").val();
				var version = $("#version").selectpicker("val")
				var postData = {
					name:name,
					version:version
				}
				var url = "ajax_createVm";
				start.funcs._ajax(postData,url,function(data){
					if(data.status == 1){
						location.href = "/vmlist"
					}
				})
			}
		},
		funcs:{
			initSelect:function(type){
				var arr = typeObj[type];
				var html = "";
				for(var i=0;i<arr.length;i++){
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