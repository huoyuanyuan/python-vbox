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

	var alertCreat = {
        onleOne:true,
        alertObj:null,
        domStr:"",
        tplDom:[
            '<div class="alert-create">',
            	'<div class="col-md-12 margin-top">',
            		'<div class="form-group">',
            			'<label for="name">名称</label>',
            			'<input type="text" class="form-control" name="name" id="name" placeholder="请输入名称">',
            		'</div>',
            		'<div class="form-group">',
            			'<label for="nickname">类型</label>',
            			'<div class="self-select">',
            				'<select id="type" class="selectpicker">',
            					'<option value="windows">windows</option>',
            					'<option value="liunx">linux</option>',
            				'</select>',
            			'</div>',
            		'</div>',
            		'<div class="form-group">',
            			'<label for="nickname">版本</label>',
            			'<div class="self-select">',
            				'<select id="version" class="selectpicker">',
            				'</select>',
            			'</div>',
            		'</div>',
            		'<button type="button" class="btn btn-primary  jSubmit disabled">创建</button>',
            	'</div>',
            '</div>',
        ].join(""),
        init:function(obj){
            this.renderData(obj);
            if(this.alertObj){
                
            }else{
                // 初始化弹窗
                this.getObj();
                start.funcs.initSelect("windows")
            }
            this.alertObj.show();
            if(this.onleOne){
                this.addEvents();
                this.onleOne = false;
            }
        },
        renderData:function(obj){
        	var _self = this;
            contentHtml = _self._render(_self.tplDom,obj);
            _self.domStr = contentHtml;
        },
        getObj:function(){
            var _self = this;
            _self.alertObj = wfe.init("alert",{
                data:{
                    center:true,
                    back_hide:true,
                    className:""
                },
                content:_self.domStr
            },$("body")[0]);
        },
        addEvents:function(){
        	console.log(">>s")
            var _self = this;
            $('#type').selectpicker({});
			$('#version').selectpicker({});

			$("#type").on("changed.bs.select",function(){
				var val = $("#type").selectpicker("val")
				console.log(val)
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
        _ajax: function(data, urls, cb, fb) {
            var ajax = {
                url: urls,
                type: 'GET',
                dataType: 'json',
                cache: false,
                traditional: true,
                data: data,
                success: function(json, statusText) {
                    // if(json.status == 1 || json.Status == true){      
                    cb && cb(json);
                    // }else{  
                    //  if(json == 1) return; 
                    //  fb&&fb(json);
                    //  gd.tipF.show_success(json.errorMsg);
                    // }
                },
                error: function(json) {
                    // console.error(json)
                }
            }
            $.ajax(ajax);
        },
    }

	var start = {
		init:function(){
			// this.addEvents();
			// this.funcs.initSelect('windows')
			alertCreat.init()
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