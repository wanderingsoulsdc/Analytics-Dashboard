import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface EnergyItem {
  current: number;
  total: number;
  unit: string;
  trend: number[];
}

interface EnergyChartProps {
  data: {
    electricity: EnergyItem;
    water: EnergyItem;
    gas: EnergyItem;
    solar: EnergyItem;
  };
}

const EnergyChart: React.FC<EnergyChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    chartInstance.current = echarts.init(chartRef.current);
    const resizeObserver = new ResizeObserver(() => chartInstance.current?.resize());
    resizeObserver.observe(chartRef.current);
    return () => {
      resizeObserver.disconnect();
      chartInstance.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!chartInstance.current) return;

    const items = [
      { name: '电力', ...data.electricity, color: '#00d4ff' },
      { name: '水资源', ...data.water, color: '#00ff88' },
      { name: '燃气', ...data.gas, color: '#ffa502' },
      { name: '太阳能', ...data.solar, color: '#7b2ff7' },
    ];

    chartInstance.current.setOption({
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(10, 14, 39, 0.9)',
        borderColor: 'rgba(0, 212, 255, 0.3)',
        textStyle: { color: '#e0e6ff', fontSize: 11 },
        formatter: (params: any) => {
          const item = items[params.dataIndex];
          return `${item.name}<br/>使用: ${item.current} ${item.unit}<br/>占比: ${((item.current / item.total) * 100).toFixed(1)}%`;
        },
      },
      series: items.map((item, index) => ({
        type: 'gauge',
        center: index < 2 ? [`${25 + index * 50}%`, '35%'] : [`${25 + (index - 2) * 50}%`, '75%'],
        radius: '30%',
        startAngle: 220,
        endAngle: -40,
        min: 0,
        max: item.total,
        pointer: { show: false },
        progress: {
          show: true,
          width: 10,
          roundCap: true,
          itemStyle: { color: item.color },
        },
        axisLine: {
          lineStyle: {
            width: 10,
            color: [[1, 'rgba(255,255,255,0.05)']],
          },
        },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        title: {
          show: true,
          offsetCenter: [0, '70%'],
          color: 'rgba(224, 230, 255, 0.6)',
          fontSize: 11,
        },
        detail: {
          offsetCenter: [0, '30%'],
          valueAnimation: true,
          color: item.color,
          fontSize: 16,
          fontWeight: 'bold',
          formatter: `${item.current}`,
        },
        data: [{ value: item.current, name: `${item.name}(${item.unit})` }],
      })),
    });
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default EnergyChart;
