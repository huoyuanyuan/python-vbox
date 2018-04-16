$(function(){
	var start = {
		init:function(){
			this.addEvents();
		},
		addEvents:function(){
			var _self = this;
			$(document).on("click",".jBtnClose",function(){
				_self.eventsHandles.close($(this));
			})
			$(document).on("click",".jBtnBegin",function(){
				_self.eventsHandles.begin($(this));
			})
			$(document).on("click",".jBtnDel",function(){
				_self.eventsHandles.del($(this));
			})
		},
		eventsHandles:{
			close:function(currentItem){
				var name = currentItem.data("name");
				var uuid = currentItem.data("uuid");
				console.log("close")
				console.log("name:",name)
				console.log("uuid:",uuid)
			},
			begin:function(currentItem){
				var name = currentItem.data("name");
				var uuid = currentItem.data("uuid");
				console.log("begin")
				console.log("name:",name)
				console.log("uuid:",uuid)
			},
			del:function(currentItem){
				var name = currentItem.data("name");
				var uuid = currentItem.data("uuid");
				console.log("del")
				console.log("name:",name)
				console.log("uuid:",uuid)
			}
		},
		funs:{
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