import React from 'react';
import './Panel.css';

interface PanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Panel: React.FC<PanelProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`panel-container ${className}`}>
      <div className="panel-header">
        <div className="panel-header-decoration left" />
        <span className="panel-title">{title}</span>
        <div className="panel-header-decoration right" />
      </div>
      <div className="panel-content">
        {children}
      </div>
      <div className="panel-corner top-left" />
      <div className="panel-corner top-right" />
      <div className="panel-corner bottom-left" />
      <div className="panel-corner bottom-right" />
    </div>
  );
};

export default Panel;
