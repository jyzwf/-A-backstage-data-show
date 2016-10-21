import $ from 'jquery';

let to_login = {
	valid:{
		require(val,err){
			console.log(val)
			if(val.trim() == ''){

				return err
			}
		}
	},
	init(){
		$('#btn').click(()=>{
			let login_msg = {
					username:$('#user').val(),
					password:$('#pswd').val()
				},
				arr = [login_msg.username,login_msg.password],
				len = arr.length,
				err_msg;

			for( let i =0; i<len ; i++ ){
				let err = this.valid.require(arr[i],'请填写完整');
				if( err ){
					err_msg = err;
					break;
				}
			}

			if(err_msg){
				alert(err_msg);
				return false;
			}

			this.send_data(login_msg);
		})
	},
	send_data(data){
		$.ajax({
    	    type:"POST",
    	    url: "*****",
    	    dataType: "json",
    	    data:data,
    	    success: function (data) {
    	    	if(data.res_code=='100'){
    	    		window.localStorage.qk_wash_username = data.account.username;
    	    		window.location.href='./index.html';
    	    	}
    	    },
    	    error: function (xhr) {
    	        alert('登录失败');
    	    }
    	});
	}

};

export { to_login }