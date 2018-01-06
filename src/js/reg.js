require(['config'],function(){
	require(['jquery'],function($){
		function vcode(){
		    var res="";
		    for(var i=0;i<4;i++){
		        res+=parseInt(Math.random()*10);
		    }
		    return res;
		}
		var yzcode=document.getElementById("vcode");
		var yzm=vcode();
		yzcode.innerHTML=yzm;
		$('.btnReg').on('click',function(){
			var _username = $('#username').val();
			var _password = $('#password').val();
			var _password2 = $('#password2').val();
			var _phone = $('#phone').val();
			var _code = $('#code').val();

			// var phone = document.getElementById('phone').value;
			var reg = /^1[34578]\d{9}$/i
			if(_phone === ''){
				alert('手机号不能为空');
				return false;
			}
			else if(!reg.test(_phone)){
				alert('手机号不合法');
				return false;
			}

			if(_code === ''){
				alert('请输入验证码');
				return false;
			}
			else if(_code != yzm){
				alert('验证码不正确');
				return false;
			}

			if(_password === ''){
				alert('密码不能为空');
				return false;
			}

			if(_password != _password2){
				alert('两次密码不一致');
				return false;
			}
			// 发起ajax请求
			$.ajax({
				// hardcode
				url:'../php/reg.php',
				data:{
					username:_username,
					phone:_phone,
					password:_password
				},
				success:function(data){
					if(data === 'fail'){
						alert('用户已存在，请登录');
						return;
					}else if(data === 'ok'){
					console.log(data)

					}else if(data === 'error'){
						alert('密码或账号不正确');
						return false;
					}

					
				}
			})
		})
	})
})