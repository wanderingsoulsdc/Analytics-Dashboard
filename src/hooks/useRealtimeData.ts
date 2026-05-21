import { useState, useEffect, useCallback } from 'react';
import {
  trafficData,
  populationData,
  environmentData,
  energyData,
  deviceData,
  alertData,
} from '../data/mockData';

function randomFluctuation(value: number, range: number): number {
  return +(value + (Math.random() - 0.5) * 2 * range).toFixed(1);
}

export function useRealtimeData(interval: number = 3000) {
  const [traffic, setTraffic] = useState(trafficData);
  const [population, _setPopulation] = useState(populationData);
  const [environment, setEnvironment] = useState(environmentData);
  const [energy, setEnergy] = useState(energyData);
  const [devices, setDevices] = useState(deviceData);
  const [alerts, _setAlerts] = useState(alertData);

  const updateData = useCallback(() => {
    setTraffic(prev => ({
      ...prev,
      congestionIndex: randomFluctuation(prev.congestionIndex, 0.3),
      totalVehicles: Math.round(randomFluctuation(prev.totalVehicles, 500)),
      avgSpeed: randomFluctuation(prev.avgSpeed, 2),
    }));

    setEnvironment(prev => ({
      ...prev,
      pm25: Math.round(randomFluctuation(prev.pm25, 3)),
      temperature: randomFluctuation(prev.temperature, 0.5),
      humidity: Math.round(randomFluctuation(prev.humidity, 2)),
      aqi: Math.round(randomFluctuation(prev.aqi, 5)),
      indicators: prev.indicators.map(ind => ({
        ...ind,
        value: +randomFluctuation(ind.value, ind.max * 0.02).toFixed(1),
      })),
    }));

    setEnergy(prev => ({
      ...prev,
      electricity: {
        ...prev.electricity,
        current: Math.round(randomFluctuation(prev.electricity.current, 20)),
      },
      water: {
        ...prev.water,
        current: Math.round(randomFluctuation(prev.water.current, 10)),
      },
      gas: {
        ...prev.gas,
        current: Math.round(randomFluctuation(prev.gas.current, 5)),
      },
    }));

    setDevices(prev => ({
      ...prev,
      online: Math.round(randomFluctuation(prev.online, 10)),
      warning: Math.round(randomFluctuation(prev.warning, 5)),
    }));
  }, []);

  useEffect(() => {
    const timer = setInterval(updateData, interval);
    return () => clearInterval(timer);
  }, [updateData, interval]);

  return { traffic, population, environment, energy, devices, alerts };
}
