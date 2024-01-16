export const AttendanceBarChart = {
    tooltip: {
        trigger: 'item'
    },
    
    xAxis: [
        {
          type: 'category',
          data: []
        }
    ],
    yAxis: [
        {
          type: 'value'
        }
    ],
    series: [
      {
        type: 'bar',
        data: []
      },
    ]
};

export const AttendanceRecordPieChart = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series : [
        {
            name:'Summary',
            type:'pie',
            radius : '65%',
            center: ['50%', '50%'],
            data: [].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(0 , 0, 0, 0.87)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(0 , 0, 0, 0.87)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#2C3162'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
};