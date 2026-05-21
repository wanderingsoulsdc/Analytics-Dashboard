import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 80;

const DataParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const particleData = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const axes = new Float32Array(PARTICLE_COUNT); // 0=X轴, 1=Z轴
    const offsets = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const axis = Math.random() > 0.5 ? 0 : 1;
      axes[i] = axis;
      speeds[i] = 0.02 + Math.random() * 0.04;
      offsets[i] = Math.random() * 20 - 10;

      if (axis === 0) {
        // X轴移动
        positions[i * 3] = Math.random() * 20 - 10;
        positions[i * 3 + 1] = 0.15;
        positions[i * 3 + 2] = [0, 4, -4][Math.floor(Math.random() * 3)];
      } else {
        // Z轴移动
        positions[i * 3] = [0, 4, -4][Math.floor(Math.random() * 3)];
        positions[i * 3 + 1] = 0.15;
        positions[i * 3 + 2] = Math.random() * 20 - 10;
      }
    }

    return { positions, speeds, axes, offsets };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const axis = particleData.axes[i];
      const speed = particleData.speeds[i];
      const idx = axis === 0 ? i * 3 : i * 3 + 2;
      arr[idx] += speed;
      if (arr[idx] > 10) arr[idx] = -10;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particleData.positions, 3]}
          count={PARTICLE_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00d4ff"
        size={0.15}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default DataParticles;
