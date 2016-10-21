import $ from 'jquery';

let logout = {
	out(){
		$('#logout').click(()=>{
			$.ajax({
    		    type:"POST",
    		    url: "*****",
    		    dataType: "json",
    		    data:{
    		    	username:window.localStorage.qk_wash_username
    		    },
    		    success: function (data) {
    		    	if(data.res_code=='100'){
    		    		window.localStorage.removeItem('qk_wash_username');
    		    		window.location.href='./login.html';
    		    	}
    		    },
    		    error: function (xhr) {
    		        alert('登录失败');
    		    }
    		});
		})
	}
};

export { logout }