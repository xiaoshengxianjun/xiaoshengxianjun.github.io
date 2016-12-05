var myChart = echarts.init(document.getElementById('main'));
// 显示标题，图例和空的坐标轴
myChart.setOption({
    title: {
        text: '前端个人技能图'
    },
    tooltip: {},
    legend: {
        data:['技能']
    },
    xAxis: {
        data: []
    },
    yAxis: {},
    series: [{
        name: '技能',
        type: 'bar',
        data: []
    }]
});

// 异步加载数据
$.get('json/fontData.json').done(function (data) {
    // 填入数据
    myChart.setOption({
        xAxis: {
            data: data.categories
        },
        series: [{
            // 根据名字对应到相应的系列
            name: '技能',
            data: data.data
        }]
    });
});
