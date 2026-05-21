import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GroundGrid: React.FC = () => {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (gridRef.current) {
      const mat = gridRef.current.material as THREE.Material;
      mat.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group>
      {/* 基础地面 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshBasicMaterial color="#0a0e27" transparent opacity={0.95} />
      </mesh>
      {/* 网格线 */}
      <gridHelper
        ref={gridRef}
        args={[30, 30, '#00d4ff', '#0a3040']}
        position={[0, 0.01, 0]}
      />
      {/* 中心辐射圈 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[3, 3.1, 64]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[6, 6.1, 64]} />
        <meshBasicMaterial color="#7b2ff7" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[9, 9.1, 64]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export default GroundGrid;
