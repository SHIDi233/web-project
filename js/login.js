// JavaScript Document	
function regist() {
				window.location.href="../register";
}

		function getValue() {
			var a = jQuery("#account").val();
			var p = jQuery("#pwd").val();
			// 发送AJAX POST请求
            // 1. 创建AJAX核心对象
            var xhr = new XMLHttpRequest();
            // 2. 注册回调函数
            xhr.onreadystatechange = function (){
                if (this.readyState == 4) {
                    if (this.status == 200) {
						var res = xhr.responseText;
						var obj = JSON.parse(res);
						if(obj.code==1){
							window.sessionStorage.setItem("CCNtoken",obj.data);
							alert(window.sessionStorage.getItem("CCNtoken"));
//							window.location.href="..?token="+window.sessionStorage.getItem("CCNtoken");
							var result="";
							jQuery.ajax({
								"type":"get",

								"url":"https://www.bilibili.com",
//								"token": window.sessionStorage.getItem("CCNtoken"),
								headers: {
        							token:  window.sessionStorage.getItem("CCNtoken")
    							},
								"success":function(rel){
									if(rel.isSuccess){
										result=rel.url;
									}

								}
	

							});
							if(result.length>0){
								window.open(result,"_blank");
							}
						}
						else{
							alert("false");
						}
                    }else{
                        alert(this.status);
                    }
                }
            }
            // 3. 开启通道
            xhr.open("POST", "/login", true)
 			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
			xhr.send("mail="+a+"&password="+p)
            // 4. 发送请求
            xhr.send()
		}