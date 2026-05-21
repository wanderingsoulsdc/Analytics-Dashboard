import React from 'react';

const Roads: React.FC = () => {
  return (
    <group>
      {/* 主干道 - 横向 */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 0.6]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.08} />
      </mesh>
      {/* 主干道 - 纵向 */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[20, 0.6]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.08} />
      </mesh>
      {/* 次干道 */}
      <mesh position={[0, 0.02, 4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 0.4]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.08} />
      </mesh>
      <mesh position={[0, 0.02, -4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 0.4]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.08} />
      </mesh>
      <mesh position={[4, 0.02, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[16, 0.4]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.08} />
      </mesh>
      <mesh position={[-4, 0.02, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[16, 0.4]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.08} />
      </mesh>
      {/* 道路中心线发光 */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 0.05]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.4} />
      </mesh>
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[20, 0.05]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

export default Roads;
