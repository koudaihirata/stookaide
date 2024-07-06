import { accentColor } from '@/style/color';
import React from 'react';


type LoadingBarProps = {
  percent: number;
};

const LoadingBar: React.FC<LoadingBarProps> = ({ percent }) => {
  return (
    <div style={{ width: '80%', backgroundColor: '#e0e0df', borderRadius: '8px', overflow: 'hidden' }}>
      <div
        style={{
          width: `${percent}%`,
          backgroundColor: accentColor,
          height: '20px',
          transition: 'width 0.3s ease-in-out',
        }}
      />
    </div>
  );
};

export default LoadingBar;
