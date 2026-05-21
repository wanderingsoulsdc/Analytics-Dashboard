import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface PopulationChartProps {
  data: {
    districts: { name: string; population: number; density: number; trend: number }[];
    totalPopulation: number;
    flowIn: number;
    flowOut: number;
  };
}

const PopulationChart: React.FC<PopulationChartProps> = ({ data }) => {
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
    const districts = [...data.districts].reverse();

    chartInstance.current.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(10, 14, 39, 0.9)',
        borderColor: 'rgba(0, 212, 255, 0.3)',
        textStyle: { color: '#e0e6ff', fontSize: 11 },
      },
      grid: { left: '20%', right: '12%', top: '8%', bottom: '8%' },
      xAxis: {
        type: 'value',
        axisLine: { show: false },
        axisLabel: { color: 'rgba(224, 230, 255, 0.4)', fontSize: 9 },
        splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.06)' } },
      },
      yAxis: {
        type: 'category',
        data: districts.map(d => d.name),
        axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.2)' } },
        axisLabel: { color: 'rgba(224, 230, 255, 0.7)', fontSize: 11 },
      },
      series: [{
        type: 'bar',
        data: districts.map(d => d.population),
        barWidth: '50%',
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#0096c7' },
            { offset: 1, color: '#00d4ff' },
          ]),
        },
        label: {
          show: true,
          position: 'right',
          color: 'rgba(0, 212, 255, 0.8)',
          fontSize: 10,
          formatter: '{c}万',
        },
      }],
    });
  }, [data]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '4px 0', marginBottom: '4px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'rgba(0,212,255,0.6)', fontSize: '10px' }}>总人口</div>
          <div style={{ color: '#00d4ff', fontSize: '16px', fontWeight: 'bold' }}>{data.totalPopulation}万</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'rgba(0,212,255,0.6)', fontSize: '10px' }}>流入</div>
          <div style={{ color: '#00ff88', fontSize: '16px', fontWeight: 'bold' }}>↑{data.flowIn.toLocaleString()}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'rgba(0,212,255,0.6)', fontSize: '10px' }}>流出</div>
          <div style={{ color: '#ff6b6b', fontSize: '16px', fontWeight: 'bold' }}>↓{data.flowOut.toLocaleString()}</div>
        </div>
      </div>
      <div ref={chartRef} style={{ width: '100%', height: 'calc(100% - 44px)' }} />
    </div>
  );
};

export default PopulationChart;
