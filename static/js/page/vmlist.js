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
			$(document).on("click",".jBtnPause",function(){
				_self.eventsHandles.pause($(this));
			})
			$(document).on("click",".jBtnResume",function(){
				_self.eventsHandles.resume($(this));
			})
			$(document).on("click",".jBtnReset",function(){
				_self.eventsHandles.reset($(this));
			})
		},
		eventsHandles:{
			close:function(currentItem){
				if(currentItem.hasClass("disabled")){
					return
				}
				currentItem.addClass("disabled")
				var parTr = currentItem.parents("tr");
				var name = parTr.data("name"),
					uuid = parTr.data("uuid");
				var postData = {
					name:name,
					uuid:uuid,
					contF:"4"
				}
				start.funcs.controlVm(postData,function(data){
					if(data.status == 1){
						location.reload(true)
					}
				})
			},
			begin:function(currentItem){
				if(currentItem.hasClass("disabled")){
					return
				}
				currentItem.addClass("disabled")
				var parTr = currentItem.parents("tr");
				var name = parTr.data("name"),
					uuid = parTr.data("uuid");
				var postData = {
					name:name,
					uuid:uuid
				}
				var url = "ajax_startVm";
				start.funcs._ajax(postData,url,function(data){
					if(data.status == 1){
						location.reload(true)
					}
				})
			},
			del:function(currentItem){
				if(currentItem.hasClass("disabled")){
					return
				}
				currentItem.addClass("disabled")
				var parTr = currentItem.parents("tr");
				var name = parTr.data("name"),
					uuid = parTr.data("uuid");
				var postData = {
					name:name,
					uuid:uuid
				}
				var url = "ajax_delVm";
				start.funcs._ajax(postData,url,function(data){
					if(data.status == 1){
						location.reload(true)
					}
				})
			},
			pause:function(currentItem){
				if(currentItem.hasClass("disabled")){
					return
				}
				currentItem.addClass("disabled")
				var parTr = currentItem.parents("tr");
				var name = parTr.data("name"),
					uuid = parTr.data("uuid");
				var postData = {
					name:name,
					uuid:uuid,
					contF:"1"
				}
				start.funcs.controlVm(postData,function(data){
					if(data.status == 1){
						currentItem.text("恢复")
						currentItem.removeClass("jBtnPause").addClass("jBtnResume")
						currentItem.removeClass("disabled")
					}
				})
			},
			resume:function(currentItem){
				if(currentItem.hasClass("disabled")){
					return
				}
				currentItem.addClass("disabled")
				var parTr = currentItem.parents("tr");
				var name = parTr.data("name"),
					uuid = parTr.data("uuid");
				var postData = {
					name:name,
					uuid:uuid,
					contF:"2"
				}
				start.funcs.controlVm(postData,function(data){
					if(data.status == 1){
						currentItem.text("暂停")
						currentItem.removeClass("jBtnResume").addClass("jBtnPause")
						currentItem.removeClass("disabled")
					}
				})
			},
			reset:function(currentItem){
				if(currentItem.hasClass("disabled")){
					return
				}
				var parTr = currentItem.parents("tr");
				var name = parTr.data("name"),
					uuid = parTr.data("uuid");
				var postData = {
					name:name,
					uuid:uuid,
					contF:"3"
				}
				start.funcs.controlVm(postData,function(data){
					console.log(data)
				})
			}
		},
		funcs:{
			controlVm:function(obj,cb){
				var postData = obj;
				var url = "ajax_controlVm"
				start.funcs._ajax(postData,url,function(data){
					cb && cb(data);
				})
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