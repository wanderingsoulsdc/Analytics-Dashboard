import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BuildingProps {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
  color: string;
}

const Building: React.FC<BuildingProps> = ({ position, width, height, depth, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (edgesRef.current) {
      const mat = edgesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2;
    }
  });

  const adjustedPos: [number, number, number] = [position[0], height / 2 + 0.01, position[2]];

  return (
    <group>
      <mesh
        ref={meshRef}
        position={adjustedPos}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : color}
          transparent
          opacity={hovered ? 0.8 : 0.6}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.3}
        />
      </mesh>
      {/* 发光边缘线框 */}
      <lineSegments ref={edgesRef} position={adjustedPos}>
        <edgesGeometry args={[new THREE.BoxGeometry(width, height, depth)]} />
        <lineBasicMaterial color={color} transparent opacity={0.6} linewidth={1} />
      </lineSegments>
      {/* 屋顶发光点 */}
      <mesh position={[position[0], height + 0.1, position[2]]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* 建筑窗户效果 - 用水平线条模拟 */}
      {Array.from({ length: Math.floor(height / 0.8) }, (_, i) => (
        <mesh key={i} position={[position[0], i * 0.8 + 0.5, position[2]]}>
          <boxGeometry args={[width + 0.02, 0.05, depth + 0.02]} />
          <meshBasicMaterial color={color} transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  );
};

export default Building;
