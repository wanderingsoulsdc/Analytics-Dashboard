import { motion, type Variants } from 'framer-motion';
import Header from './components/layout/Header';
import EventTicker from './components/layout/EventTicker';
import Panel from './components/layout/Panel';
import { CityModel } from './components/3d';
import {
  TrafficChart,
  PopulationChart,
  AlertList,
  EnvironmentRadar,
  EnergyChart,
  DeviceStatus,
} from './components/charts';
import { ParticleBackground, ScanLine } from './components/effects';
import { useRealtimeData } from './hooks/useRealtimeData';
import './App.css';

// Framer Motion 面板入场动画配置
const panelVariants: Variants = {
  hidden: (direction: 'left' | 'right') => ({
    opacity: 0,
    x: direction === 'left' ? -60 : 60,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

function App() {
  const { traffic, population, environment, energy, devices, alerts } = useRealtimeData(3000);

  return (
    <div className="dashboard-layout">
      {/* 背景粒子 */}
      <div className="particles-wrapper">
        <ParticleBackground />
      </div>

      {/* 扫描线 */}
      <ScanLine />

      {/* 顶部标题栏 */}
      <div className="dashboard-header-area">
        <Header />
      </div>

      {/* 左侧面板 */}
      <motion.div
        className="dashboard-left"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={panelVariants} custom="left" style={{ flex: 1, minHeight: 0 }}>
          <Panel title="交通流量监控">
            <TrafficChart data={traffic} />
          </Panel>
        </motion.div>
        <motion.div variants={panelVariants} custom="left" style={{ flex: 1, minHeight: 0 }}>
          <Panel title="人口分布统计">
            <PopulationChart data={population} />
          </Panel>
        </motion.div>
        <motion.div variants={panelVariants} custom="left" style={{ flex: 0.8, minHeight: 0 }}>
          <Panel title="实时告警信息">
            <AlertList alerts={alerts} />
          </Panel>
        </motion.div>
      </motion.div>

      {/* 中央3D城市模型 */}
      <motion.div
        className="dashboard-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
      >
        <CityModel />
      </motion.div>

      {/* 右侧面板 */}
      <motion.div
        className="dashboard-right"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={panelVariants} custom="right" style={{ flex: 1, minHeight: 0 }}>
          <Panel title="环境监测">
            <EnvironmentRadar data={environment} />
          </Panel>
        </motion.div>
        <motion.div variants={panelVariants} custom="right" style={{ flex: 1, minHeight: 0 }}>
          <Panel title="能源消耗">
            <EnergyChart data={energy} />
          </Panel>
        </motion.div>
        <motion.div variants={panelVariants} custom="right" style={{ flex: 0.8, minHeight: 0 }}>
          <Panel title="设备运行状态">
            <DeviceStatus data={devices} />
          </Panel>
        </motion.div>
      </motion.div>

      {/* 底部事件滚动条 */}
      <div className="dashboard-footer">
        <EventTicker />
      </div>
    </div>
  );
}

export default App;
