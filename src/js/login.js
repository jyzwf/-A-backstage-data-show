import loginCss from '../scss/login';
import { to_login } from '../components/login_operate';

window.onload = ()=>{
	var W = window.innerWidth,H = window.innerHeight;
		dl_config({
			W:W,		//canvas宽度
			H:H,		//canvas高度
			cvBgColor:'#2196f3',	//canvas背景色
			minDist:70,				//小于这个距离，两个点之间用线连接
			dotColor:'white',		//点的颜色
			dotCount:150,			//点的数量
			dotRadius:4,			//点的大小
			dotVx:1,				//点的横向速度
			dotVy:1,				//点的纵向速度
			dotAx:10000,			//当两点之间被连接的时候，此时点的横向加速度
			dotAy:20000,			//当两点之间被连接的时候，此时点的纵向加速度
			lineColor:'rgb(255,255,255)',	//线的颜色，必须是rgb(*,*,*)
			canvas:document.getElementById('canvas')		//获取canvas元素
		})
	to_login.init()
}
