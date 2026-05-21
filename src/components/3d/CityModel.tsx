import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import CityScene from './CityScene';

const CityModel: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [15, 15, 15], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 20, 10]} intensity={0.5} color="#00d4ff" />
          <pointLight position={[-10, 15, -10]} intensity={0.3} color="#7b2ff7" />
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
          <CityScene />
          <OrbitControls
            enablePan={false}
            minDistance={8}
            maxDistance={35}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2.5}
          />
          <fog attach="fog" args={['#0a0e27', 25, 55]} />
        </Suspense>
      </Canvas>
      {/* 中心区域覆盖层 - 装饰性HUD */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(0,212,255,0.6)',
        fontSize: '12px',
        letterSpacing: '2px',
        pointerEvents: 'none',
        textShadow: '0 0 10px rgba(0,212,255,0.5)',
      }}>
        🖱 拖拽旋转 · 滚轮缩放
      </div>
    </div>
  );
};

export default CityModel;
