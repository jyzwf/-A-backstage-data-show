import $ from 'jquery';
import {draw} from './draw_chart';
import {logout} from './logout';
let draw_obj,xAxisName;

let fill_data = {

	// 所有楼还是单楼
	type : {
		all_building(){
			// 改变状态
			$('#change_echart span').removeClass('active');
			$(this).addClass('active').siblings('select').addClass('hide');
			xAxisName = '楼号';
			fill_data.get_data({
					url:'http://api.xtongtong.com/washer/index.php/home/data/getDataOfSchool.html',
					data:{}
				});
		},
		single_building(){
			$('#change_echart span').removeClass('active');
			$(this).addClass('active').siblings('select').removeClass('hide').val('');
			xAxisName = '洗衣机号';
		}
	},



	draw_charts(){
		let _this = this;
		var my_chart = draw.fill_data(document.querySelector('#building'));
		draw_obj = my_chart;
		$('#change_echart span').click(function(){
			if($(this).hasClass('active')){
				return false;
			}
			let id = $(this)[0].id;
			_this.type[id].call(this);
		})
		return this;
	},

	// 单栋的时候选择楼号
	select_building(){
		let _this = this;
		$('#select_b').change(function(){
			if($('#single_building').hasClass('active')){
				// 发送请求
				_this.get_data({
					url:'*****',
					data:{
						building:$('#select_b').val()
					}
				});
			}
		})

		return this;
	},

	init(){
		logout.out();
		this.select_building().draw_charts().type['all_building'].call($('#all_building'));
	},


	get_data(send){
		let reset = {};
		draw_obj.showLoading();
		console.log(send)
		$.ajax({
    	    type:"POST",
    	    url: send.url,
    	    dataType: "json",
    	    data:send.data,
    	    success: function (data) {
    	        if(data.res_code==100){
    	        	reset = {
    	        		xAxis:[
								{
									data: data.data.xAxis.data,
									name:xAxisName
								}
						],
						series: [
    					    {
    					        name:'收益',
    					        data:data.data.money
					
    					    },
    					    {
    					        name:'使用量',
    					        data:data.data.count
					
    					    }
    					]
    	        	}
    	        	draw_obj.hideLoading();
    	        	draw_obj.setOption(reset);

    	        }else{
    	        	alert('请求失败');
    	        	draw_obj.hideLoading();
    	        }
    	    },
    	    error: function (xhr) {
    	        alert('请求失败');
    	        draw_obj.hideLoading();
    	    }
    	});
	}
};

export {fill_data}