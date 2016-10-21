;(function(win){
	// 获取更光滑的动画
	win.requestAnimFrame = (function(){
		return win.requestAnimationFrame		||
			   win.webkitRequestAnimationFrame	||
			   win.mozRequestAnimationFrame		||
			   win.oRequestAnimationFrame		||
			   win.msRequestAnimationFrame		||
			   function( callback ){
			   		win.setTimeout( callback, 1000 / 60);
			   };
	})();

	var dot_line = {
		// 粒子的配置
		config:{},

		// 包含各个粒子的数组
		particles:[],

		// 初始化canvas
		setCanvas : function(){
			var config = this.config;
			config.canvas.width = config.W;
			config.canvas.height = config.H;
			this.cxt = config.canvas.getContext('2d');
			return this;
		},

		// 画canvas的背景
		paintCanvas:function(){
			var config = this.config; 
			this.cxt.fillStyle = config.cvBgColor;
			this.cxt.fillRect(0,0,config.W,config.H);
		},


		// 粒子类
		particleClass : function(){
			var cxt = this.cxt,
				config = this.config;

			return function Particle(){

				// 粒子的初始位置
				this.x = Math.random() * config.W;
				this.y = Math.random() * config.H;

				// 粒子的速度
				this.vx = Math.random() * config.dotVx;
				this.vy = Math.random() * config.dotVy;

				// 粒子的大小
				this.radius = config.dotRadius;

				// 画粒子
				this.draw = function(){
					cxt.fillStyle = config.dotColor;
					cxt.beginPath();
		  			cxt.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		  			cxt.fill();
				}
			}
		},

		//	往粒子数组中加入粒子
		addParticle:function(){
			var particlesCount = this.config.dotCount,
				i=0,
				Particle = this.particleClass();

			for(;i<particlesCount;i++){
				this.particles.push(new Particle());
			}

			// console.log(this.particles)
			return this;
		},

		// 在canvas里添加动画
		draw:function(){

			this.paintCanvas();

			// 各个粒子开始画
			
			var i = 0,len = this.particles.length;

			for(;i<len;i++){
				 this.particles[i].draw();
			}

			// 更新各个粒子的状态
			this.update();
		},


		// 让粒子动起来
		update:function(){
			var i =0,j,len = this.particles.length,p,p2;
			var config = this.config;

			for(;i<len;i++){
				p = this.particles[i];

				// 改变例子速度
				p.x += p.vx;
				p.y += p.vy;

				// 判断例子距离画布周边的距离以及碰到后的动作
				
				// 水平方向上的限制
				if(p.x + p.radius > config.W){
					p.x = p.radius;
				}else if(p.x - p.radius < 0){
					p.x = config.W - p.radius;
				}

				// 竖直方向上的限制
				if(p.y + p.radius > config.H){
					p.y = p.radius;
				}else if(p.y - p.radius < 0){
					p.y = config.H - p.radius;
				}


				// 当粒子之间的距离大于规定距离时，画线
				
				for(j = i+1;j<len;j++){
					this.distance(p,this.particles[j])
				}
			}
		},

		// 画线操作
		distance:function(p1,p2){
			var dx = p1.x - p2.x,
				dy = p1.y - p2.y,
				dist = Math.sqrt( dx*dx + dy*dy ),
				config = this.config,
				cxt = this.cxt,
				ax = dx / config.dotAx,
				ay = dy / config.dotAy,
				// 获取线的颜色
				rgb = config.lineColor.match(/\d+/g),
				rgb_r = +rgb[0],
				rgb_g = +rgb[1],
				rgb_b = +rgb[2];


			// 判断距离，，如果到达，就连接两点
			if(dist <= config.minDist){
				cxt.beginPath();
				cxt.strokeStyle = 'rgba('+rgb_r+','+rgb_g+','+rgb_b+','+(1.3- dist/config.minDist) +")";
				cxt.moveTo(p1.x,p1.y);
				cxt.lineTo(p2.x,p2.y);
				cxt.stroke();
				cxt.closePath();

				// 根据粒子的距离来决定加速度
				p1.vx -= ax;
				p1.vy -= ay;

				p2.vx += ax;
				p2.vy += ay;
			}
		},


		// 循环动画
		beginLoop:function(){
			dot_line.draw();
			requestAnimFrame(dot_line.beginLoop);
		},

		// 初始化
		init(config){
			this.config = config;
			this.setCanvas().addParticle().beginLoop();
		}
	};

	// 暴露接口
	win.dl_config = function(config){
		dot_line.init(config);
	}
})(window);