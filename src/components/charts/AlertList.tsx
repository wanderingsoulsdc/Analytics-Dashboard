import React, { useEffect, useRef } from 'react';
import './AlertList.css';

interface Alert {
  id: number;
  level: string;
  message: string;
  time: string;
  area: string;
}

interface AlertListProps {
  alerts: Alert[];
}

const levelConfig: Record<string, { color: string; label: string }> = {
  critical: { color: '#ff4757', label: '严重' },
  warning: { color: '#ffa502', label: '警告' },
  info: { color: '#00d4ff', label: '提示' },
};

const AlertList: React.FC<AlertListProps> = ({ alerts }) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
        el.scrollTop = 0;
      } else {
        el.scrollTop += 1;
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const doubledAlerts = [...alerts, ...alerts];

  return (
    <div className="alert-list-container" ref={listRef}>
      {doubledAlerts.map((alert, index) => {
        const config = levelConfig[alert.level] || levelConfig.info;
        return (
          <div key={`${alert.id}-${index}`} className="alert-item">
            <span className="alert-badge" style={{
              backgroundColor: config.color + '20',
              color: config.color,
              borderColor: config.color + '40',
            }}>
              {config.label}
            </span>
            <span className="alert-message">{alert.message}</span>
            <span className="alert-time">{alert.time}</span>
          </div>
        );
      })}
    </div>
  );
};

export default AlertList;
