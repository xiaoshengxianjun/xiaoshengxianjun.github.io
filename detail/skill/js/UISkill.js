var myChart = echarts.init(document.getElementById('main'));
myChart.setOption({
	title : {
        text: 'UI个人技能图',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
	series: [{
			name: '技能',
			type: 'pie',
//			radius: '55%',
			roseType: 'angle',
			data: [{
				value: 92,
				name: 'Photoshop'
			}, {
				value: 85,
				name: 'Illustrator'
			}, {
				value: 82,
				name: 'Axure'
			}, {
				value: 74,
				name: 'X-mind'
			}, {
				value: 80,
				name: 'After Effects'
			},{
				value: 70,
				name: 'Markman'
			},{
				value: 75,
				name: 'Cutterman'
			}],
			itemStyle: {
				normal: {
					// 阴影的大小
					shadowBlur: 200,
					// 阴影水平方向上的偏移
					shadowOffsetX: 0,
					// 阴影垂直方向上的偏移
					shadowOffsetY: 0,
					// 阴影颜色
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				},
				emphasis: {
			        shadowBlur: 200,
			        shadowColor: 'rgba(0, 0, 0, 0.5)'
			    }
			}
		}
	]
});
