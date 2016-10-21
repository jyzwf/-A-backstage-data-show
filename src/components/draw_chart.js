import {option} from './init_chart';
import echarts from 'echarts';

let draw = {
	init_chart(obj){
        obj.style.width = document.querySelector('#main_content').innerWidth+'px';
        return echarts.init(obj);
    },

    fill_data(obj){
    	var my_chart = this.init_chart(obj);
    	my_chart.setOption(option);
    	return my_chart;
    },
};

export {draw}