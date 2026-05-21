import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface EnvironmentRadarProps {
  data: {
    indicators: { name: string; value: number; max: number }[];
    aqi: number;
    temperature: number;
    humidity: number;
    windDirection: string;
  };
}

const EnvironmentRadar: React.FC<EnvironmentRadarProps> = ({ data }) => {
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

    chartInstance.current.setOption({
      tooltip: {
        backgroundColor: 'rgba(10, 14, 39, 0.9)',
        borderColor: 'rgba(0, 212, 255, 0.3)',
        textStyle: { color: '#e0e6ff', fontSize: 11 },
      },
      radar: {
        indicator: data.indicators.map(ind => ({
          name: ind.name,
          max: ind.max,
        })),
        shape: 'polygon',
        splitNumber: 4,
        axisName: {
          color: 'rgba(224, 230, 255, 0.6)',
          fontSize: 10,
        },
        splitLine: {
          lineStyle: { color: 'rgba(0, 212, 255, 0.1)' },
        },
        splitArea: {
          areaStyle: {
            color: ['rgba(0, 212, 255, 0.02)', 'rgba(0, 212, 255, 0.04)'],
          },
        },
        axisLine: {
          lineStyle: { color: 'rgba(0, 212, 255, 0.15)' },
        },
      },
      series: [{
        type: 'radar',
        data: [{
          value: data.indicators.map(ind => ind.value),
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 212, 255, 0.4)' },
              { offset: 1, color: 'rgba(123, 47, 247, 0.1)' },
            ]),
          },
          lineStyle: { color: '#00d4ff', width: 2 },
          itemStyle: { color: '#00d4ff' },
          symbol: 'circle',
          symbolSize: 4,
        }],
      }],
    });
  }, [data]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '4px 0' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'rgba(0,212,255,0.6)', fontSize: '10px' }}>AQI</div>
          <div style={{ color: data.aqi > 100 ? '#ff4757' : '#00ff88', fontSize: '18px', fontWeight: 'bold' }}>
            {data.aqi}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'rgba(0,212,255,0.6)', fontSize: '10px' }}>温度</div>
          <div style={{ color: '#00d4ff', fontSize: '18px', fontWeight: 'bold' }}>{data.temperature}°C</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'rgba(0,212,255,0.6)', fontSize: '10px' }}>湿度</div>
          <div style={{ color: '#00d4ff', fontSize: '18px', fontWeight: 'bold' }}>{data.humidity}%</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'rgba(0,212,255,0.6)', fontSize: '10px' }}>风向</div>
          <div style={{ color: '#00d4ff', fontSize: '14px', fontWeight: 'bold' }}>{data.windDirection}</div>
        </div>
      </div>
      <div ref={chartRef} style={{ width: '100%', height: 'calc(100% - 44px)' }} />
    </div>
  );
};

export default EnvironmentRadar;
