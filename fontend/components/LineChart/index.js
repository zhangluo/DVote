// components/LineChart.js
"use client"; // 确保此组件在客户端渲染

import React from 'react';
import ReactECharts from 'echarts-for-react';

const LineChart = () => {
  const options = {
    title: {
      text: '每天投票和捐款统计',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '投票数',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110, 130],
      },
      {
        name: '捐款金额',
        type: 'line',
        data: [30, 300, 120, 90, 40, 130, 60],
      },
    ],
  };

  return <ReactECharts option={options} />;
};

export default LineChart;
