let option = {
    tooltip: {
        trigger: 'axis'
    },
    toolbox: {
        feature: {
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    legend: {
        data:['收益','使用量']
    },
    xAxis: [
        {
            type: 'category',
            data: []
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '收益/ 元',
            min: 0,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: '使用量/ 次',
            min: 0,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: [
        {
            name:'收益',
            type:'line',
            data:[]

        },
        {
            name:'使用量',
            type:'line',
            yAxisIndex: 1,
            data:[]
        }
    ]
};


export {option};