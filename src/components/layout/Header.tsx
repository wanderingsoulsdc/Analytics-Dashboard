import React, { useState, useEffect } from 'react';
import './Header.css';

const Header: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour12: false });
  };

  const weekDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <span className="header-date">{formatDate(currentTime)}</span>
        <span className="header-weekday">{weekDay[currentTime.getDay()]}</span>
      </div>
      <div className="header-center">
        <div className="header-decoration-line left" />
        <h1 className="header-title">智慧城市数据孪生指挥中心</h1>
        <div className="header-decoration-line right" />
      </div>
      <div className="header-right">
        <span className="header-time">{formatTime(currentTime)}</span>
        <span className="header-weather">☀ 22°C 晴</span>
      </div>
    </header>
  );
};

export default Header;
