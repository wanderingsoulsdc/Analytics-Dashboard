import React, { useEffect, useState } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { tsParticles } from '@tsparticles/engine';

const ParticleBackground: React.FC = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    loadSlim(tsParticles).then(() => setInitialized(true));
  }, []);

  if (!initialized) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: false,
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          color: { value: ['#00d4ff', '#7b2ff7', '#0096c7'] },
          links: {
            color: '#00d4ff',
            distance: 120,
            enable: true,
            opacity: 0.15,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'bounce' },
          },
          number: {
            density: { enable: true },
            value: 50,
          },
          opacity: {
            value: { min: 0.1, max: 0.4 },
            animation: {
              enable: true,
              speed: 0.5,
              sync: false,
            },
          },
          shape: { type: 'circle' },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
        style: {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          zIndex: '0',
          pointerEvents: 'none',
        },
      }}
    />
  );
};

export default ParticleBackground;
