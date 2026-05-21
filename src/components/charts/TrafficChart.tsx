import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface TrafficChartProps {
  data: {
    timestamps: string[];
    routes: { name: string; data: number[] }[];
    congestionIndex: number;
    totalVehicles: number;
    avgSpeed: number;
  };
}

const TrafficChart: React.FC<TrafficChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    chartInstance.current = echarts.init(chartRef.current, undefined, { renderer: 'canvas' });

    const handleResize = () => chartInstance.current?.resize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      chartInstance.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!chartInstance.current) return;

    const colors = ['#00d4ff', '#7b2ff7', '#00ff88'];

    chartInstance.current.setOption({
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(10, 14, 39, 0.9)',
        borderColor: 'rgba(0, 212, 255, 0.3)',
        textStyle: { color: '#e0e6ff', fontSize: 11 },
      },
      legend: {
        data: data.routes.map(r => r.name),
        textStyle: { color: 'rgba(224, 230, 255, 0.6)', fontSize: 10 },
        top: 0,
        itemWidth: 12,
        itemHeight: 2,
      },
      grid: {
        left: '8%',
        right: '4%',
        top: '18%',
        bottom: '12%',
      },
      xAxis: {
        type: 'category',
        data: data.timestamps,
        axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.2)' } },
        axisLabel: { color: 'rgba(224, 230, 255, 0.4)', fontSize: 9, interval: 3 },
        splitLine: { show: false },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisLabel: { color: 'rgba(224, 230, 255, 0.4)', fontSize: 9 },
        splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.06)' } },
      },
      series: data.routes.map((route, i) => ({
        name: route.name,
        type: 'line',
        data: route.data,
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 2, color: colors[i] },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: colors[i] + '40' },
            { offset: 1, color: colors[i] + '05' },
          ]),
        },
      })),
      animation: true,
      animationDuration: 800,
    });
  }, [data]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '4px 0', marginBottom: '4px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'rgba(0,212,255,0.6)', fontSize: '10px' }}>拥堵指数</div>
          <div style={{ color: '#00d4ff', fontSize: '18px', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,212,255,0.5)' }}>
            {data.congestionIndex.toFixed(1)}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'rgba(0,212,255,0.6)', fontSize: '10px' }}>车辆总数</div>
          <div style={{ color: '#00d4ff', fontSize: '18px', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,212,255,0.5)' }}>
            {data.totalVehicles.toLocaleString()}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'rgba(0,212,255,0.6)', fontSize: '10px' }}>平均车速</div>
          <div style={{ color: '#00d4ff', fontSize: '18px', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,212,255,0.5)' }}>
            {data.avgSpeed} <span style={{ fontSize: '10px', fontWeight: 'normal' }}>km/h</span>
          </div>
        </div>
      </div>
      <div ref={chartRef} style={{ width: '100%', height: 'calc(100% - 48px)' }} />
    </div>
  );
};

export default TrafficChart;
