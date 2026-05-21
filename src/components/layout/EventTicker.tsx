import React from 'react';
import { eventStreamData } from '../../data/mockData';
import './EventTicker.css';

const EventTicker: React.FC = () => {
  const doubledEvents = [...eventStreamData, ...eventStreamData];

  return (
    <div className="event-ticker">
      <div className="ticker-label">实时动态</div>
      <div className="ticker-track">
        <div className="ticker-content">
          {doubledEvents.map((event, index) => (
            <span key={index} className="ticker-item">
              <span className="ticker-dot" />
              {event}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventTicker;
