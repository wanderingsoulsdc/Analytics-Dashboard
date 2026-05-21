import React, { useRef } from 'react';
import * as THREE from 'three';
import Building from './Building';
import Roads from './Roads';
import DataParticles from './DataParticles';
import GroundGrid from './GroundGrid';

// 建筑数据 - 程序化生成城市布局
const buildingLayout = [
  // 中心商业区 - 高楼
  { pos: [0, 0, 0] as [number, number, number], w: 1.2, h: 6, d: 1.2, color: '#00d4ff' },
  { pos: [2, 0, 0] as [number, number, number], w: 1, h: 8, d: 1, color: '#00b4d8' },
  { pos: [-2, 0, 0] as [number, number, number], w: 1.4, h: 5, d: 1.4, color: '#0096c7' },
  { pos: [0, 0, 2] as [number, number, number], w: 1, h: 7, d: 1.3, color: '#7b2ff7' },
  { pos: [0, 0, -2] as [number, number, number], w: 1.3, h: 4.5, d: 1, color: '#9d4edd' },
  { pos: [2, 0, 2] as [number, number, number], w: 0.9, h: 5.5, d: 0.9, color: '#00d4ff' },
  { pos: [-2, 0, -2] as [number, number, number], w: 1.1, h: 3.5, d: 1.1, color: '#7b2ff7' },
  { pos: [2, 0, -2] as [number, number, number], w: 1, h: 4, d: 1.2, color: '#00b4d8' },
  { pos: [-2, 0, 2] as [number, number, number], w: 1.2, h: 6.5, d: 1, color: '#9d4edd' },
  // 外围区域 - 中等建筑
  { pos: [5, 0, 0] as [number, number, number], w: 1, h: 3, d: 1, color: '#00d4ff' },
  { pos: [-5, 0, 0] as [number, number, number], w: 1.2, h: 2.5, d: 1.2, color: '#0096c7' },
  { pos: [0, 0, 5] as [number, number, number], w: 0.8, h: 3.5, d: 0.8, color: '#7b2ff7' },
  { pos: [0, 0, -5] as [number, number, number], w: 1, h: 2, d: 1, color: '#00b4d8' },
  { pos: [5, 0, 3] as [number, number, number], w: 0.9, h: 2, d: 0.9, color: '#9d4edd' },
  { pos: [-5, 0, 3] as [number, number, number], w: 1, h: 2.5, d: 1, color: '#00d4ff' },
  { pos: [5, 0, -3] as [number, number, number], w: 0.8, h: 1.8, d: 0.8, color: '#0096c7' },
  { pos: [-5, 0, -3] as [number, number, number], w: 1.1, h: 3, d: 1.1, color: '#7b2ff7' },
  { pos: [3, 0, 5] as [number, number, number], w: 0.7, h: 2, d: 0.7, color: '#00b4d8' },
  { pos: [-3, 0, 5] as [number, number, number], w: 0.9, h: 1.5, d: 0.9, color: '#9d4edd' },
  { pos: [3, 0, -5] as [number, number, number], w: 1, h: 2.5, d: 1, color: '#00d4ff' },
  { pos: [-3, 0, -5] as [number, number, number], w: 0.8, h: 2, d: 0.8, color: '#7b2ff7' },
  // 远郊 - 矮建筑
  { pos: [7, 0, 2] as [number, number, number], w: 0.6, h: 1.5, d: 0.6, color: '#0096c7' },
  { pos: [-7, 0, -2] as [number, number, number], w: 0.7, h: 1.2, d: 0.7, color: '#00b4d8' },
  { pos: [7, 0, -4] as [number, number, number], w: 0.8, h: 1, d: 0.8, color: '#9d4edd' },
  { pos: [-7, 0, 4] as [number, number, number], w: 0.6, h: 1.8, d: 0.6, color: '#00d4ff' },
];

const CityScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      <GroundGrid />
      <Roads />
      {buildingLayout.map((b, i) => (
        <Building key={i} position={b.pos} width={b.w} height={b.h} depth={b.d} color={b.color} />
      ))}
      <DataParticles />
    </group>
  );
};

export default CityScene;
