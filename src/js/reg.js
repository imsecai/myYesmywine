require(['config'],function(){
	require(['jquery'],function($){
		$('.btnReg').on('click',function(){
			var _username = $('#username').val();
			var _password = $('#password').val();

			// 发起ajax请求
			$.ajax({
				// hardcode
				url:'../mysql/reg.php',
				data:{
					username:_username,
					password:_password
				},
				success:function(data){
					if(data === 'fail'){

						return;
					}

					
					console.log(data)
				}
			})
		})
	})
})