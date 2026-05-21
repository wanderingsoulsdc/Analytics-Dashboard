// 交通流量数据
export const trafficData = {
  timestamps: Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`),
  routes: [
    { name: '长安大道', data: [120, 132, 101, 80, 65, 55, 70, 95, 180, 210, 195, 188, 176, 190, 205, 220, 245, 260, 230, 200, 175, 160, 145, 130] },
    { name: '科技路', data: [90, 85, 72, 60, 48, 40, 55, 88, 165, 198, 185, 170, 160, 175, 190, 210, 230, 250, 215, 185, 155, 140, 120, 100] },
    { name: '未来大道', data: [110, 105, 88, 70, 55, 45, 60, 92, 175, 205, 190, 178, 168, 182, 198, 215, 238, 255, 225, 195, 165, 150, 135, 115] },
  ],
  congestionIndex: 3.2,
  totalVehicles: 128456,
  avgSpeed: 42.5,
};

// 人口统计数据
export const populationData = {
  districts: [
    { name: '高新区', population: 52.3, density: 8500, trend: 2.1 },
    { name: '雁塔区', population: 48.7, density: 7800, trend: 1.5 },
    { name: '未央区', population: 45.2, density: 7200, trend: 3.2 },
    { name: '碑林区', population: 38.9, density: 9200, trend: -0.5 },
    { name: '莲湖区', population: 35.6, density: 8100, trend: 0.8 },
    { name: '灞桥区', population: 28.4, density: 5600, trend: 4.5 },
  ],
  totalPopulation: 1280.5,
  flowIn: 12580,
  flowOut: 9870,
};

// 环境监测数据
export const environmentData = {
  pm25: 35,
  pm10: 58,
  temperature: 22.5,
  humidity: 65,
  noise: 52,
  aqi: 72,
  windSpeed: 3.2,
  windDirection: '东南风',
  indicators: [
    { name: 'PM2.5', value: 35, max: 150 },
    { name: 'PM10', value: 58, max: 200 },
    { name: '噪音(dB)', value: 52, max: 100 },
    { name: '温度(°C)', value: 22.5, max: 45 },
    { name: '湿度(%)', value: 65, max: 100 },
    { name: 'CO(mg/m³)', value: 0.8, max: 4 },
  ],
};

// 能源消耗数据
export const energyData = {
  electricity: { current: 2856, total: 5000, unit: 'MWh', trend: [2100, 2300, 2500, 2650, 2700, 2856] },
  water: { current: 1820, total: 3000, unit: '万吨', trend: [1500, 1600, 1650, 1700, 1780, 1820] },
  gas: { current: 890, total: 1500, unit: '万m³', trend: [720, 750, 800, 830, 860, 890] },
  solar: { current: 420, total: 800, unit: 'MWh', trend: [280, 320, 350, 380, 400, 420] },
};

// 设备状态数据
export const deviceData = {
  total: 25680,
  online: 24396,
  offline: 1028,
  warning: 256,
  categories: [
    { name: '摄像头', total: 8500, online: 8245, icon: '📷' },
    { name: '传感器', total: 12000, online: 11520, icon: '📡' },
    { name: '信号灯', total: 3200, online: 3100, icon: '🚦' },
    { name: '充电桩', total: 1980, online: 1531, icon: '🔌' },
  ],
};

// 告警事件数据
export const alertData = [
  { id: 1, level: 'critical', message: '长安大道-科技路交叉口交通拥堵严重', time: '14:32:05', area: '高新区' },
  { id: 2, level: 'warning', message: '未央路3号监控设备离线', time: '14:28:17', area: '未央区' },
  { id: 3, level: 'info', message: '碑林区PM2.5指数上升至45', time: '14:25:33', area: '碑林区' },
  { id: 4, level: 'critical', message: '雁塔区水管压力异常', time: '14:20:12', area: '雁塔区' },
  { id: 5, level: 'warning', message: '高新区充电桩#2058故障', time: '14:15:48', area: '高新区' },
  { id: 6, level: 'info', message: '灞桥区噪音监测超标', time: '14:10:22', area: '灞桥区' },
  { id: 7, level: 'warning', message: '莲湖区信号灯#1205闪烁异常', time: '14:05:09', area: '莲湖区' },
  { id: 8, level: 'critical', message: '科技路天然气管道压力告警', time: '14:00:35', area: '高新区' },
  { id: 9, level: 'info', message: '全市用电负荷已达峰值85%', time: '13:55:41', area: '全市' },
  { id: 10, level: 'warning', message: '未央区4号传感器数据异常', time: '13:50:18', area: '未央区' },
];

// 实时事件流数据
export const eventStreamData = [
  '高新区交通信号优化完成，通行效率提升12%',
  '雁塔区新增5个智能停车位已上线',
  '碑林区空气质量持续改善，AQI降至72',
  '全市智能路灯节能模式已启动，预计节省15%电力',
  '未央区新建监控系统联调成功',
  '灞桥区河道水质监测系统升级完成',
  '全市累计接入IoT设备突破25000台',
  '高新区自动驾驶测试区域扩展至3.5km²',
];
