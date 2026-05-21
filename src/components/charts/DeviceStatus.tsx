import React from 'react';
import './DeviceStatus.css';

interface DeviceStatusProps {
  data: {
    total: number;
    online: number;
    offline: number;
    warning: number;
    categories: { name: string; total: number; online: number; icon: string }[];
  };
}

const DeviceStatus: React.FC<DeviceStatusProps> = ({ data }) => {
  const onlineRate = ((data.online / data.total) * 100).toFixed(1);

  return (
    <div className="device-status">
      <div className="device-summary">
        <div className="device-stat">
          <span className="stat-value" style={{ color: '#00d4ff' }}>{data.total.toLocaleString()}</span>
          <span className="stat-label">设备总数</span>
        </div>
        <div className="device-stat">
          <span className="stat-value" style={{ color: '#00ff88' }}>{onlineRate}%</span>
          <span className="stat-label">在线率</span>
        </div>
        <div className="device-stat">
          <span className="stat-value" style={{ color: '#ffa502' }}>{data.warning}</span>
          <span className="stat-label">告警数</span>
        </div>
      </div>
      <div className="device-categories">
        {data.categories.map((cat) => {
          const rate = (cat.online / cat.total) * 100;
          return (
            <div key={cat.name} className="device-category">
              <div className="category-header">
                <span className="category-icon">{cat.icon}</span>
                <span className="category-name">{cat.name}</span>
                <span className="category-count">{cat.online}/{cat.total}</span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${rate}%`,
                    background: rate > 95 ? 'linear-gradient(90deg, #0096c7, #00ff88)' :
                               rate > 80 ? 'linear-gradient(90deg, #0096c7, #00d4ff)' :
                               'linear-gradient(90deg, #ff4757, #ffa502)',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeviceStatus;
