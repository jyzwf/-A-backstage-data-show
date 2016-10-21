import $ from 'jquery';
import {draw} from './draw_chart';
import {logout} from './logout';
let draw_obj ;

let history = {
	// 全选操作
	select_all(){
		$('#all_select').click(function(){
			let _this = $(this);
			$('input[name="building"').each(function(){
				$(this).prop('checked',_this.is(':checked'));
			})
		})
		return this;
	},

	// 限制截止时间大于起始时间
	limit_gt(){
		$('#begin_date').change(function(){
			let tommorow_t = new Date($('#begin_date').val()).getTime() + 24*60*60*1000,
				tommorow = new Date(tommorow_t);

			let y = tommorow.getFullYear(),
				t_m = tommorow.getMonth() + 1, 
				m =t_m<10 ? '0'+t_m : t_m,
				t_d = tommorow.getDate(),
				d = t_d<10 ? '0'+t_d : t_d,
				min_d = '' + y+'-'+m+'-'+d;

			$('#end_date').attr('min',min_d);
		})

		return this;
	},


	//单选操作
	single_operate(){
		$('input[name="building"]').click(function(){
			var is_check = $('input[name="building"]:not(:checked)').length ? false :true;
			$('#all_select').prop('checked',is_check);
		})
		return this;
	},

	// 获取发送的数据
	send_date(){
		// 判断是否为空
		let start_time = $('#begin_date').val(),
			end_time = $('#end_date').val(),
			buildings = [],
			test_arr,
			flag;

		$('input[name="building"]').each(function(){
			if($(this).prop('checked')){
				buildings.push($(this).val());
			}
		})

		test_arr = [start_time,end_time,buildings[0]];
		flag = test_arr.filter((item)=>{
			return !!item == false;
		})


		if(flag.length){
			alert('请选择完整');
			return false;
		}

		return {
			start_time:start_time,
			end_time:end_time,
			building:buildings
		}

	},


// 查询操作
	search_act(){
		let _this = this,
			reset;
		var my_chart = draw.fill_data(document.querySelector('#date'));

		draw_obj = my_chart;

		$('#search').click(function(){
			reset = _this.send_date();
			if(!reset){
				return false;
			}
			_this.get_data(reset);
		})
	},

// 初始化
	init(){
		logout.out();
		this.select_all().single_operate().limit_gt().search_act();
	},

// ajax请求
	get_data(data){
		let reset = {};
		draw_obj.showLoading();
		$.ajax({
    	    type:"POST",
    	    url: "*****",
    	    dataType: "json",
    	    data:data,
    	    success: function (data) {
    	        if(data.res_code==100){

    	        	$('#count').text(data.all.times);
    	        	$('#money').text(data.all.money);
    	        	reset = {
    	        		xAxis:[
								{
									data: data.data.xAxis.data,
									name:'日期'
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

export {history}